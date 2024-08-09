import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import projectService from '../../services/projectService';

 const ProjectDetails = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProject = async () => {
    try {
      const res = await projectService.findProjectById(id);
      setProject(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err, "Error fetching project details");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

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
                <div className="section-headline white-headline">
                  <h3>{project.name} Details</h3>
                </div>
                <ul className="breadcrumb-bg">
                  <li className="home-bread">Home</li>
                  <li>{project.name} Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog Area Start */}
      <div className="blog-area fix page-padding">
        <div className="container">
          <div className="row">
            <div className="blog-details">
              <div className="col-md-8 col-sm-8 col-xs-12">
                {/* single-blog start */}
                <article className="blog-post-wrapper">
                  <div className="blog-banner">
                    <img
                      src={`http://localhost:4000/app/file/projects/${project.file}`}
                      alt={project.name}
                    />
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="admin-type">
                          <i className="fa fa-user" />
                          Admin
                        </span>
                        <span className="date-type">
                          <i className="fa fa-calendar" />
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                      <blockquote>
                        <p>
                          {project.etat} - {project.duration} days
                        </p>
                      </blockquote>
                      <h5>Category: {project.category?.name}</h5>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>

    </>
  );
};
 
export default ProjectDetails