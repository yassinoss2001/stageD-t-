import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import Swal from 'sweetalert2';
import employeeService from '../../services/employeeService';

const ProfileInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [auth, setAuth] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setAuth(user);
    console.log("User data from localStorage:", user);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      firstName: auth?.user?.firstName,
      email: auth?.user?.email,
      phone: auth?.user?.phone,
      adress: auth?.user?.adress,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (values) => {
    console.log("Auth user data before update:", auth);
    if (!auth?.user?.id) {
      console.error("User ID is undefined.");
      Swal.fire({
        title: 'Error',
        text: 'User ID is undefined.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update your profile?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        await employeeService.updateEmployee(auth.user.id, values);
        const updatedAuth = { ...auth, user: { ...auth.user, ...values } };
        localStorage.setItem('user', JSON.stringify(updatedAuth));
        setAuth(updatedAuth);
        setIsModalOpen(false);

        Swal.fire({
          title: 'Updated!',
          text: 'Your profile has been updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update profile.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ marginTop: "250px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-center">
              <div className="card-body">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="Profile Image"
                  className="rounded-circle mb-3"
                  style={{ width: 100 }}
                />
                <h5 className="card-title">{auth?.user?.firstName}</h5>
                <p className="card-text">Full Stack Developer</p>
                <p className="card-text">Bay Area, San Francisco, CA</p>
                <Button type="primary" onClick={showModal}>
                  Update profile
                </Button>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Full Name</h5>
                <p className="card-text">{auth?.user?.firstName}</p>
                <h5 className="card-title">Email</h5>
                <p className="card-text">{auth?.user?.email}</p>
                <h5 className="card-title">Phone</h5>
                <p className="card-text">{auth?.user?.phone}</p>
                <h5 className="card-title">Address</h5>
                <p className="card-text">{auth?.user?.adress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Profile"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form 
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
          initialValues={{
            firstName: auth?.user?.firstName,
            email: auth?.user?.email,
            phone: auth?.user?.phone,
            adress: auth?.user?.adress,
          }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="adress"
            label="Address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
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

export default ProfileInfo;
