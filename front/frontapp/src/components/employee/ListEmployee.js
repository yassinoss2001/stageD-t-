import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification } from 'antd';
import Swal from 'sweetalert2'; 
import { Footer } from 'antd/es/layout/layout';
import { Navbar } from '../../layouts/Navbar';
import employeeService from '../../services/employeeService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosApi from '../../config/axios';


export const ListEmployee = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [form] = Form.useForm();
  
  const findallEmployee=()=>{
    axiosApi.get("http://localhost:4000/users/role?role=Employee").then((res)=>{
        console.log(res,"all employee");
        setAllEmployees(res.data.data)
    })
}
useEffect(()=>{
    findallEmployee()
},[])

  const handleDelete = async (id) => {
    try {
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
        await employeeService.deleteEmployee(id);
        Swal.fire({
          title: 'Success',
          text: 'Employee deleted successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        findallEmployee();
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete employee',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleEdit = (record) => {
    setCurrentEmployee(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      await employeeService.updateEmployee(currentEmployee._id, values);
      notification.success({
        message: 'Success',
        description: 'Employee updated successfully',
      });
      findallEmployee();
      setIsModalOpen(false);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update employee',
      });
    }
  };

  useEffect(() => {
    findallEmployee();
  }, []); 

  const columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'adress',
      key: 'address',
    },
    {
      title: 'Update',
      render: (text, record) => (
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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
                    <h2 className='text-center mb-5'>List Employees</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allEmployees} columns={columns} rowKey="_id" />
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
        title="Update Employee"
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
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter the role' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter the first name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter the last name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="adress"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};
