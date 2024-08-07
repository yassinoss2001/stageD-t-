import React, { useEffect, useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import projectService from '../../services/projectService'; 

export const Project = () => {
  const [allProjects, setAllProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await projectService.findAllProjects();
      console.log('API Response:', res.data); 
      if (Array.isArray(res.data.data)) {
        setAllProjects(res.data.data);
      } else {
        console.error('Unexpected data format:', res.data.data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-area">
        <div className="breadcumb-overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="breadcrumb text-center">
                <div className="section-headline white-headline">
                  <h3>Projects</h3>
                </div>
                <ul className="breadcrumb-bg">
                  <li className="home-bread">Home</li>
                  <li>Projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <div className="project-area fix bg-color page-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h3>Our Projects</h3>
                <p>Explore our diverse range of projects and find out more about what we do</p>
              </div>
            </div>
          </div>
          <div className="row">
            {allProjects.length > 0 ? (
              allProjects.map(project => (
                <div key={project._id} className="col-md-4 col-sm-6 col-xs-12">
                  <div className="single-project">
                    <div className="project-image">
                      {project.file && <img src={project.file} alt={project.name} className="project-image-img" />}
                    </div>
                    <div className="project-content">
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                      <p><strong>Status:</strong> {project.status}</p>
                      <p><strong>Duration:</strong> {project.duration}</p>
                      <p><strong>Category:</strong> {project.category}</p>
                    
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects available</p>
            )}
          </div>
        </div>
      </div>
    

      <Footer />
    </>
  );
};
