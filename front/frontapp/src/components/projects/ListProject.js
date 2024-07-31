import { Button, Table } from 'antd';
import { Footer } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../layouts/Navbar'
import projectService from '../../services/projectService';
import { EditOutlined , DeleteOutlined   } from '@ant-design/icons';
import Swal from 'sweetalert2'


export const ListProject = () => {

  const [allProjects, setAllProjects] = useState([]) 
  const fetchProjects = async()=>{
    projectService.findAllProjects().then((res)=>{
      console.log(res,"ressss");
      setAllProjects(res.data.data)
    }).catch((err)=>{
      console.log(err,"errr");
    })
  }
  
  useEffect(() => {
    fetchProjects()
  }, [])
  
   const deleteProject = (id)=>{
    projectService.deleteProject(id).then((res)=>{
      let arr = [...allProjects]
      setAllProjects(arr.filter(p=>p._id !== id))
    }).catch((err)=>{
      console.log(err,"err")
    
    })
   }
        
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'name',
          },
          {
            title: 'Etat',
            dataIndex: 'etat',
            key: 'name',
          },
          {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'name',
          },
          {
            title: 'File',
            dataIndex: 'file',
            key: 'name',
          },
          {
            title: 'Category',
dataIndex: 'category',
            render:(text,record)=>{
              console.log(record,"recooorrrrd")

              return <>{record?.category?.name}</>
            }
             
            
          },
          {
            title: 'Tasks',
            dataIndex: 'tasks',
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
              <Button type="primary" shape="circle" icon={<DeleteOutlined /> } 
              
              onClick={
                ()=>{
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteProject(record?._id)
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    }
                  });
                }
              }
              />
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
                                        <h2 className='text-center mb-5'>List Projects</h2>
                                        <div id="contactForm" className="contact-form " style={{marginTop:"20px"}}>
                                        <Table dataSource={allProjects} columns={columns} />;

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
