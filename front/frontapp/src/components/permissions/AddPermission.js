import React, { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import permissionService from '../../services/permissionService';
import typeService from '../../services/typeService';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

export const AddPermission = () => {
  const {id} =useParams()

  const [auth, setAuth] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setAuth(user);
    console.log("User data from localStorage:", user);
  }, []);


  const [form] = Form.useForm();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await typeService.findAllTypes();
        setTypes(res.data.data);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };

    fetchTypes();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await permissionService.addPermission({
        reason: values.reason,
        dateDeb: values.dateDeb.format('YYYY-MM-DD'),
        dateFin: values.dateFin.format('YYYY-MM-DD'),
        status: "hold",
        type: values.type,
        user: id


      });
      Swal.fire({
        title: 'Success',
        text: 'Permission added successfully',
        icon: 'success',
        timer: 1500, 
        showConfirmButton: false, 
      });
      form.resetFields();
    } catch (err) {
      console.log("Error adding permission:", err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add permission',
        icon: 'error',
        timer: 1500, // Auto-dismiss after 1.5 seconds
        showConfirmButton: false, // Hide the confirm button
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-area">
        <div className="breadcumb-overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="breadcrumb text-center">
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End breadcrumb Area */}
      {/* Start contact Area */}
      <div className="contact-area page-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginTop: "40px" }}>
              <div className="contact-form">
                <div className="row">
                  <h2 className="text-center mb-5">Add a Permission</h2>
                  <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                      <Form.Item
                        name="reason"
                        label="Reason"
                        rules={[{ required: true, message: 'Please enter the reason' }]}
                      >
                        <TextArea
                          rows={4}
                          placeholder="Reason"
                        />
                      </Form.Item>
                      <Form.Item
                        name="dateDeb"
                        label="Start Date"
                        rules={[{ required: true, message: 'Please select the start date' }]}
                      >
                        <DatePicker format="YYYY-MM-DD" />
                      </Form.Item>
                      <Form.Item
                        name="dateFin"
                        label="End Date"
                        rules={[{ required: true, message: 'Please select the end date' }]}
                      >
                        <DatePicker format="YYYY-MM-DD" width="100%" />
                      </Form.Item>
                    {/*   <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please enter the status' }]}
                      >
                        <Input placeholder="Status" />
                      </Form.Item> */}
                      <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'Please select a type' }]}
                      >
                        <Select
                          placeholder="Select Type"
                          allowClear
                        >
                          {types.map(type => (
                            <Option key={type._id} value={type._id}>
                              {type.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                        >
                          Add Permission
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            {/* End Left contact */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
