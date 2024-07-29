import { Button, Table } from 'antd';
import { Footer } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../layouts/Navbar'
import permissionService from '../../services/permissionService';
import { EditOutlined , DeleteOutlined   } from '@ant-design/icons';


export const ListPermission = () => {

  const [allPermissions, setAllPermissions] = useState([]) 
  const fetchPermissions = async()=>{
    permissionService.findAllPermissions().then((res)=>{
      console.log(res,"ressss");
      setAllPermissions(res.data.data)
    }).catch((err)=>{
      console.log(err,"errr");
    })
  }
  
  useEffect(() => {
    fetchPermissions()
  }, [])
  
   
        
        const columns = [
          {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'name',
          },
          {
            title: 'DateDebut',
            dataIndex: 'dateDeb',
            key: 'name',
          },
          {
            title: 'DateFin',
            dataIndex: 'dateFin',
            key: 'name',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'name',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'name',
          },
          {
            title: 'Update',
         render:(text,record)=>(
          <Button type="primary" shape="circle" icon={<EditOutlined /> }  />
          )
  
         
          },
          {
            title: 'Delete',
            render:(text,record)=>(
              <Button type="primary" shape="circle" icon={<DeleteOutlined /> }  />
              )
          },
        ];

  return (

    <>
   < Navbar/>
    <div>
                <div className="contact-area page-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{marginTop:"40px"}}>
                                <div className="contact-form">
                                    <div className="row">
                                        <h2 className='text-center mb-5'>List Permissions</h2>
                                        <div id="contactForm" className="contact-form " style={{marginTop:"20px"}}>
                                        <Table dataSource={allPermissions} columns={columns} />;

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Left contact */}
                        </div>
                    </div>
                </div>
            </div>

            < Footer/>

    </>
  )
}
