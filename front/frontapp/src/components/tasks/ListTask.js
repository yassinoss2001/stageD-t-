import { Button, Table } from 'antd';
import { Footer } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../layouts/Navbar'
import taskService from '../../services/taskService';
import { EditOutlined , DeleteOutlined   } from '@ant-design/icons';


export const ListTask = () => {

  const [allTasks, setAllTasks] = useState([]) 
  const fetchTasks = async()=>{
    taskService.findAllTasks().then((res)=>{
      console.log(res,"ressss");
      setAllTasks(res.data.data)
    }).catch((err)=>{
      console.log(err,"errr");
    })
  }
  
  useEffect(() => {
    fetchTasks()
  }, [])
  
   
        
        const columns = [
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'name',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'name',
          },
          {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'name',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'name',
          },
          {
            title: 'Project',
            dataIndex: 'project',
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
                                        <h2 className='text-center mb-5'>List Task</h2>
                                        <div id="contactForm" className="contact-form " style={{marginTop:"20px"}}>
                                        <Table dataSource={allTasks} columns={columns} />;

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
