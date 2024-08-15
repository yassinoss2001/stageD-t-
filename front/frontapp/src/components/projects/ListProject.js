import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification, Select, Upload } from 'antd';
import Swal from 'sweetalert2';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import projectService from '../../services/projectService';
import categoryService from '../../services/catergoryService';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export const ListProject = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await projectService.findAllProjects();
      setAllProjects(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await categoryService.findAllCategories();
      setAllCategories(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

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
        await projectService.deleteProject(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your project has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchProjects();
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete project',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleEdit = (record) => {
    setCurrentProject(record);
    form.setFieldsValue({
      ...record,
      category: record.category ? record.category._id : undefined,
    });
    setSelectedCategory(record.category ? record.category._id : null);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
        formData.append('category', selectedCategory);
  
        if (fileList.length > 0) {
          formData.append('file', fileList[0]);
        }

        try {
          await projectService.updateProject(currentProject._id, formData);
          notification.success({
            message: 'Success',
            description: 'Project updated successfully',
          });
          fetchProjects();
          setIsModalOpen(false);
        } catch (err) {
          notification.error({
            message: 'Error',
            description: 'Failed to update project',
          });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const columns = [
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: (text, record) => (
        <img src={`http://localhost:4000/app/file/projects/${record?.file}`} width="50px" height="50px" alt="project file" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Etat',
      dataIndex: 'etat',
      key: 'etat',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (text, record) => <>{record?.category?.name}</>,
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

  const handleFileChange = ({ fileList }) => setFileList(fileList);
  const handleCategoryChange = (value) => setSelectedCategory(value);

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
                    <h2 className="text-center mb-5">List Projects</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allProjects} columns={columns} rowKey="_id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Update Project"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="file"
            label="File"
            rules={[{ required: true, message: 'Please upload a file' }]}
          >
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
              onChange={handleFileChange}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="etat"
            label="Etat"
            rules={[{ required: true, message: 'Please enter the project state' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter the project duration' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder="Select a category"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              {allCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
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
