import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification, Select } from 'antd';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import permissionService from '../../services/permissionService';
import typeService from '../../services/typeService';  // Correct default import
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

export const ListPermission = () => {
  const [allPermissions, setAllPermissions] = useState([]);
  const [allTypes, setAllTypes] = useState([]); // State for permission types
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [form] = Form.useForm();

  const fetchPermissions = async () => {
    try {
      const res = await permissionService.findAllPermissions();
      setAllPermissions(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await typeService.findAllTypes(); // Fetch types
      setAllTypes(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Show a confirmation dialog before deleting
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        await permissionService.deletePermission(id);
        Swal.fire({
          title: 'Success',
          text: 'Permission deleted successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        // Refresh the list after deletion
        fetchPermissions();
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete permission',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleEdit = (record) => {
    setCurrentPermission(record);
    form.setFieldsValue({
      reason: record.reason,
      dateDeb: record.dateDeb,
      dateFin: record.dateFin,
      status: record.status,
      type: record.type ? record.type._id : undefined // Set selected type
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      await permissionService.updatePermission(currentPermission._id, {
        ...values,
        type: values.type, // Include selected type
      });
      notification.success({
        message: 'Success',
        description: 'Permission updated successfully',
      });
      fetchPermissions();
      setIsModalOpen(false);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update permission',
      });
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchTypes(); // Fetch types when component mounts
  }, []);

  const columns = [
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'DateDebut',
      dataIndex: 'dateDeb',
      key: 'dateDeb',
    },
    {
      title: 'DateFin',
      dataIndex: 'dateFin',
      key: 'dateFin',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Type',
      render: (text, record) => <>{record?.type?.name}</>,
    },
    {
      title: 'Update',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
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
                    <h2 className='text-center mb-5'>List Permissions</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allPermissions} columns={columns} rowKey="_id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Permission"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please enter the reason for the permission' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateDeb"
            label="Start Date"
            rules={[{ required: true, message: 'Please enter the start date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="dateFin"
            label="End Date"
            rules={[{ required: true, message: 'Please enter the end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please enter the status' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select placeholder="Select a type">
              {allTypes.map(type => (
                <Option key={type._id} value={type._id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Footer />
    </>
  );
};
