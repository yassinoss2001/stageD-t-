import React, { useEffect, useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import Select from 'react-select';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';
import employeeService from '../../services/employeeService';
import Swal from 'sweetalert2';

export const AddTask = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await projectService.findAllProjects();
      setAllProjects(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await employeeService.findAllEmployees();
      setAllEmployees(res.data.data);
    } catch (err) {
      console.log(err, "errr");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  useEffect(() => {
    setProjectOptions(
      allProjects?.map((res) => ({
        label: res.name,
        value: res._id,
      }))
    );
  }, [allProjects]);

  useEffect(() => {
    setEmployeeOptions(
      allEmployees?.map((res) => ({
        label: `${res.firstName} ${res.lastName}`,
        value: res._id,
      }))
    );
  }, [allEmployees]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [project, setProject] = useState("");
  const [employee, setEmployee] = useState("");

  const taskAdd = async () => {
    let data = {
      title: name,
      description: description,
      status: status,
      duration: duration,
      project: project,
      user: employee, 
    };

    try {
      const res = await taskService.addTask(data);
      if(res.status === 201){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task has been added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // Clear form fields
        setName("");
        setDescription("");
        setStatus("");
        setDuration("");
        setProject("");
        setEmployee("");
      }
    } catch (err) {
      console.log(err, "resssssssss");
    }
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
                        <input 
                          type="text" 
                          id="task_name"
                          onChange={(e) => setName(e.target.value)} 
                          className="form-control" 
                          placeholder="Task Name" 
                          value={name}
                          required 
                          data-error="Please enter the task name" 
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea 
                          id="description"
                          onChange={(e) => setDescription(e.target.value)} 
                          className="form-control" 
                          placeholder="Description" 
                          value={description}
                          required 
                          data-error="Please enter the task description" 
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <select
                          className="form-control"
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="in progress">in progress</option>
                          <option value="completed">completed</option>
                        </select>
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input 
                          type="text"
                          onChange={(e) => setDuration(e.target.value)}
                          id="duration" 
                          className="form-control" 
                          placeholder="Duration" 
                          value={duration}
                          required 
                          data-error="Please enter the task duration" 
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <Select
                          options={projectOptions}
                          onChange={(e) => setProject(e?.value)}
                          placeholder="Select Project"
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <Select
                          options={employeeOptions}
                          onChange={(e) => setEmployee(e?.value)}
                          placeholder="Assign to Employee"
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
