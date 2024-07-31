import { Button, Table, notification } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../layouts/Navbar';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import typeService from '../../services/typeService';

export const ListType = () => {
  const [allTypes, setAllTypes] = useState([]);

  const fetchTypes = async () => {
    try {
      const res = await typeService.findAllTypes();
      setAllTypes(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const handleDelete = async (id) => {
    try {
      await typeService.deleteType(id);
      notification.success({
        message: 'Success',
        description: 'Type deleted successfully',
      });
      // Refresh the list after deletion
      fetchTypes();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete type',
      });
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Update',
      render: (text, record) => (
        <Button type="primary" shape="circle" icon={<EditOutlined />} />
      )
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
      )
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
                    <h2 className='text-center mb-5'>List Type</h2>
                    <div id="contactForm" className="contact-form" style={{ marginTop: "20px" }}>
                      <Table dataSource={allTypes} columns={columns} rowKey="_id" />
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
