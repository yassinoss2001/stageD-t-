import React from 'react'
import { Footer } from '../../layouts/Footer'
import { Navbar } from '../../layouts/Navbar'

export const AddTask = () => {
  const projects = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' }
  ];

  return (
    <>
      <Navbar/>
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
                    <h2 className='text-center mb-5'>Add a Task</h2>
                    <div id="contactForm" className="contact-form">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="title" className="form-control" placeholder="Title" required data-error="Please enter the task title" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea id="description" className="form-control" placeholder="Description" required data-error="Please enter the task description" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="duration" className="form-control" placeholder="Duration" required data-error="Please enter the task duration" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="status" className="form-control" placeholder="Status" required data-error="Please enter the task status" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <select id="project" className="form-control" required data-error="Please select a project">
                          <option value="">Select Project</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="submit" id="submit" className="add-btn contact-btn">Add Task</button>
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
      <Footer/>
    </>
  )
}
