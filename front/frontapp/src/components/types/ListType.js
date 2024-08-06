import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Navbar } from '../../layouts/Navbar';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import typeService from '../../services/typeService';
import Swal from 'sweetalert2';

export const ListType = () => {
  const [allTypes, setAllTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [form] = Form.useForm();

  const fetchTypes = async () => {
    try {
      const res = await typeService.findAllTypes();
      setAllTypes(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await typeService.deleteType(id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Type deleted successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          fetchTypes();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete type',
          });
        }
      }
    });
  };

  const handleEdit = (record) => {
    setCurrentType(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      await typeService.updateType(currentType._id, values);
      notification.success({
        message: 'Success',
        description: 'Type updated successfully',
      });
      fetchTypes();
      setIsModalOpen(false);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update type',
      });
    }
  };

  useEffect(() => {
    fetchTypes();
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
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
      )
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
      )
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
                    <h2 className='text-center mb-5'>List Type</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allTypes} columns={columns} rowKey="_id" />
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
        title="Update Type"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="name"
            label="Type Name"
            rules={[{ required: true, message: 'Please enter the type name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};
