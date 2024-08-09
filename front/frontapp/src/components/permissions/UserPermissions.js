import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, notification, Select } from 'antd';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import permissionService from '../../services/permissionService';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const UserPermissions = () => {

    const {id}=useParams()

    const [userPermissions, setUserPermissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPermission, setCurrentPermission] = useState(null);
    const [form] = Form.useForm();


    const fetchPermissions = async () => {
        try {
            const res = await permissionService.findPermissionByUserId(id);
            setUserPermissions(res.data.data);
            console.log("resss",res)
        } catch (err) {
            console.log(err, "Error fetching permissions");
        }
    };

    useEffect(() => {
    fetchPermissions()
    }, [])
    

    const handleEdit = (record) => {
        setCurrentPermission(record);
        form.setFieldsValue({
            type: record.type,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = async (values) => {
        try {
            await permissionService.updatePermission(currentPermission._id, {
                type: values.type,
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
                                        <h2 className="text-center mb-5">My Permissions</h2>
                                        <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                                            <Table dataSource={userPermissions} columns={columns} rowKey="_id" />
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
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'Please select the permission type' }]}
                    >
                        <Select placeholder="Select type">
                            {/* Add options for permission types here */}
                            <Option value="read">Read</Option>
                            <Option value="write">Write</Option>
                            <Option value="admin">Admin</Option>
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

export default UserPermissions;
