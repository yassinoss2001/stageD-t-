import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, notification } from 'antd';
import { Navbar } from '../../layouts/Navbar';
import catergoryService from '../../services/catergoryService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

export const ListCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await catergoryService.findAllCategories();
      setAllCategories(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      await catergoryService.deleteCategory(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your category has been deleted.",
        icon: "success",
      });
      fetchCategories();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await catergoryService.updateCategory(selectedCategory._id, { name: categoryName });
      notification.success({
        message: 'Success',
        description: 'Category updated successfully',
      });
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update category',
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Update',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            setSelectedCategory(record);
            setCategoryName(record.name);
            setIsModalOpen(true);
          }}
        />
      ),
    },
    {
      title: 'Delete',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(record._id);
              }
            });
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div>
        <div className="contact-area page-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginTop: "40px" }}>
                <div className="contact-form">
                  <div className="row">
                    <h2 className='text-center mb-5'>List Categories</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allCategories} columns={columns} rowKey="_id" />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Left contact */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Category"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
      </Modal>
    </>
  );
};
