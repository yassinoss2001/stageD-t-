import React, { useEffect, useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import Select from 'react-select';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';

export const AddTask = () => {
  const [allProjects, setAllProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const res = await projectService.findAllProjects();
      setAllProjects(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const [filteredProjects, setFilteredProjects] = useState([]);
  useEffect(() => {
    fetchProjects();
    setFilteredProjects(
      allProjects?.map((res) => {
        return {
          label: res.name,
          value: res._id,
        };
      })
    );
  }, [allProjects]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [project, setProject] = useState("");

  const taskAdd = () => {
   
  let data = {
    title: name,
    description: description,
    status: status,
    duration: duration,
    project:project
  }

    taskService.addTask(data).then((res) => {
      console.log(data, "dataaaaaaaaaaa");
      console.log(res, "resssssssss");
    }).catch((err) => {
      console.log(err, "resssssssss");
    });
  };

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
                    <h2 className='text-center mb-5'>Add a Task</h2>
                    <div id="contactForm" className="contact-form">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="task_name"
                          onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Task Name" required data-error="Please enter the task name" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea id="description"
                          onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" required data-error="Please enter the task description" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <select
                          className="form-control"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="in progress">in progress</option>
                          <option value="completed">completed</option>
                        </select>
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text"
                          onChange={(e) => setDuration(e.target.value)}
                          id="duration" className="form-control" placeholder="Duration" required data-error="Please enter the task duration" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <Select
                          options={filteredProjects}
                          onChange={(e) => setProject(e?.value)}
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="submit" onClick={taskAdd} id="submit" className="add-btn contact-btn">Add Task</button>
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
  );
};
