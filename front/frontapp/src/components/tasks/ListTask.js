import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification, Select } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Navbar } from '../../layouts/Navbar';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService'; // Import project service
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;

export const ListTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [allProjects, setAllProjects] = useState([]); // State for projects
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      const res = await taskService.findAllTasks();
      setAllTasks(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await projectService.findAllProjects(); // Fetch projects
      setAllProjects(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your task has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      fetchTasks();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete task',
      });
    }
  };

  const handleEdit = (record) => {
    setCurrentTask(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      duration: record.duration,
      status: record.status,
      project: record.project ? record.project._id : undefined // Set selected project
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      await taskService.updateTask(currentTask._id, {
        ...values,
        project: values.project, // Include selected project
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
    fetchTasks();
    fetchProjects(); // Fetch projects when component mounts
  }, []);

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
                    <h2 className='text-center mb-5'>List Task</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allTasks} columns={columns} rowKey="_id" />
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
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the task title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the task description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter the task duration' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please enter the task status' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="project"
            label="Project"
            rules={[{ required: true, message: 'Please select a project' }]}
          >
            <Select placeholder="Select a project">
              {allProjects.map(project => (
                <Option key={project._id} value={project._id}>
                  {project.name}
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
