import React, { useState, useEffect } from 'react';
import { Button, Table, notification } from 'antd';
import { Navbar } from '../../layouts/Navbar';
import catergoryService from '../../services/catergoryService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const ListCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

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
      notification.success({
        message: 'Success',
        description: 'Category deleted successfully',
      });
      // Refresh the list after deletion
      fetchCategories();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete category',
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
        <Button type="primary" shape="circle" icon={<EditOutlined />} />
      ),
    },
    {
      title: 'Delete',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
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
    </>
  );
};
