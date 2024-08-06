import React, { useEffect, useState } from 'react'
import { Footer } from '../../layouts/Footer'
import { Navbar } from '../../layouts/Navbar'
import Select from 'react-select'
import catergoryService from '../../services/catergoryService';
import projectService from '../../services/projectService';
import Swal from 'sweetalert2'


export const AddProject = () => {
  const [allCategories, setAllCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await catergoryService.findAllCategories();
      setAllCategories(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };
  const [filtredcate, setfiltredcate] = useState([])
  useEffect(() => {
    fetchCategories()
    setfiltredcate(
      allCategories?.map((res) => {
        return {
          label: res.name,
          value: res._id
        }
      })
    )
  }, [allCategories])
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [status, setstatus] = useState("")
  const [duration, setduration] = useState("")
  const [category, setcategory] = useState("")
  const [file, setfile] = useState(null)
  const projectAdd = () => {
    const data = new FormData()
    data.append("name", name)
    data.append("description", description)
    data.append("etat", status)
    data.append("file", file)
    data.append("category", category)
    data.append("duration", duration)
    projectService.addProject(data).then((res) => {
      console.log(data, "dataaaaaaaaaaa")
      console.log(res, "resssssssss")
      if(res.status===201){
        Swal.fire({
          position: "center",
          icon: "success",
          title: " project has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      
      }
    
    }).catch((err) => {
      console.log(err, "resssssssss")
      Swal.fire({
        position: "center",
        icon: "error",
        title: "failed to save project",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
  return (
    <>
      <Navbar />
      <div>
        <div className="page-area">
          <div className="breadcumb-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="breadcrumb text-center">
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End breadcumb Area */}
        {/* Start contact Area */}
        <div className="contact-area page-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="contact-form">
                  <div className="row">
                    <h2 className='text-center mb-5'>Add a Project</h2>
                    <div id="contactForm" className="contact-form">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="file" id="file"
                          onChange={(e) => setfile(e.target.files[0])}
                          className="form-control" required data-error="Please upload a file" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="project_name"
                          onChange={(e) => setname(e.target.value)} className="form-control" placeholder="Project Name" required data-error="Please enter the project name" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea id="description"
                          onChange={(e) => setdescription(e.target.value)} className="form-control" placeholder="Description" required data-error="Please enter the project description" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <select
                          className="form-control"
                          onChange={(e) => setstatus(e.target.value)}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="in progress">in progress</option>
                          <option value="completed">completed</option>
                        </select>
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text"
                          onChange={(e) => setduration(e.target.value)}
                          id="duration" className="form-control" placeholder="Duration" required data-error="Please enter the project duration" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <Select
                          options={filtredcate}
                          onChange={(e) => setcategory(e?.value)}
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="submit" onClick={projectAdd} id="submit" className="add-btn contact-btn">Add Project</button>
                        <div id="msgSubmit" className="h3 text-center hidden" />
                        <div className="clearfix" />
                      </div>
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
  )
}