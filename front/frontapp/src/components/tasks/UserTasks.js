import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, notification, Select } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Navbar } from '../../layouts/Navbar';
import taskService from '../../services/taskService';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserTasks = () => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setAuth(user);
        console.log("User data from localStorage:", user);
      }, []);

  const [userTasks, setUserTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      const res = await taskService.findTasksByUserId(`${auth?.user._id}`);
      setUserTasks(res.data.data);
    } catch (err) {
      console.log(err, "Error fetching tasks");
    }
  };



  const handleEdit = (record) => {
    setCurrentTask(record);
    form.setFieldsValue({
      status: record.status,
    });
    setIsModalOpen(true);
  };

 
  const handleUpdate = async (values) => {
    try {
      await taskService.updateTask(currentTask._id, {
        status: values.status,
      });
      notification.success({
        message: 'Success',
        description: 'Task updated successfully',
      });
      fetchTasks(); 
      setIsModalOpen(false);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update task',
      });
    }
  };

useEffect(() => {
  fetchTasks()
}, [])


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Project',
      render: (text, record) => <>{record?.project?.name}</>,
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
                    <h2 className="text-center mb-5">My Tasks</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={userTasks} columns={columns} rowKey="_id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
    
     
   
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the task status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Completed">Completed</Option>
              <Option value="In Progress">In Progress</Option>
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

export default UserTasks;