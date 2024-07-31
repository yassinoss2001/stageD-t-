import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import { notification } from 'antd';

export const AddTask = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    status: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.findAllProjects();
        const projectOptions = response.data.data.map(project => ({
          value: project.id,
          label: project.name
        }));
        setProjects(projectOptions);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      notification.error({
        message: 'Error',
        description: 'Please select a project'
      });
      return;
    }

    const taskData = {
      ...formData,
      projectId: selectedProject.value
    };

    try {
      await taskService.addTask(taskData);
      notification.success({
        message: 'Success',
        description: 'Task added successfully'
      });
      // Optionally, reset the form
      setFormData({
        title: '',
        description: '',
        duration: '',
        status: ''
      });
      setSelectedProject(null);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add task'
      });
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
                      <form onSubmit={handleSubmit}>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                          />
                          <div className="help-block with-errors" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <textarea
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                          <div className="help-block with-errors" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="duration"
                            className="form-control"
                            placeholder="Duration"
                            required
                            value={formData.duration}
                            onChange={handleInputChange}
                          />
                          <div className="help-block with-errors" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="status"
                            className="form-control"
                            placeholder="Status"
                            required
                            value={formData.status}
                            onChange={handleInputChange}
                          />
                          <div className="help-block with-errors" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <Select
                            id="project"
                            options={projects}
                            onChange={handleProjectChange}
                            placeholder="Select Project"
                            value={selectedProject}
                            required
                          />
                          <div className="help-block with-errors" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <button type="submit" id="submit" className="add-btn contact-btn">Add Task</button>
                          <div id="msgSubmit" className="h3 text-center hidden" />
                          <div className="clearfix" />
                        </div>
                      </form>
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
