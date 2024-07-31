import { Button, Table, notification } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../layouts/Navbar';
import permissionService from '../../services/permissionService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const ListPermission = () => {
  const [allPermissions, setAllPermissions] = useState([]);

  const fetchPermissions = async () => {
    try {
      const res = await permissionService.findAllPermissions();
      setAllPermissions(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      await permissionService.deletePermission(id);
      notification.success({
        message: 'Success',
        description: 'Permission deleted successfully',
      });
      // Refresh the list after deletion
      fetchPermissions();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete permission',
      });
    }
  };

  useEffect(() => {
    fetchPermissions();
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
      render: (text, record) => (
        <>{record?.type?.name}</>
      ),
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
                    <h2 className='text-center mb-5'>List Permissions</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allPermissions} columns={columns} rowKey="_id" />
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
