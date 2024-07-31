import { Button, Table, notification } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../layouts/Navbar';
import employeeService from '../../services/employeeService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const ListEmployee = () => {
  const [allEmployees, setAllEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await employeeService.findAllEmployees();
      setAllEmployees(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      notification.success({
        message: 'Success',
        description: 'Employee deleted successfully',
      });
      fetchEmployees();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete employee',
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
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
      <Footer />
    </>
  );
};
