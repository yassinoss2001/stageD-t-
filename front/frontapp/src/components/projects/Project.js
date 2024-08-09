import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import projectService from '../../services/projectService';
export const Project = () => {
  const [allProjects, setAllProjects] = useState([])
  const fetchProjects = async () => {
    projectService.findAllProjects().then((res) => {
      console.log(res, "ressss");
      setAllProjects(res.data.data)
    }).catch((err) => {
      console.log(err, "errr");
    })
  }
  useEffect(() => {
    fetchProjects()
  }, [])
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
                  <h3>Blog</h3>
                </div>
                <ul className="breadcrumb-bg">
                  <li className="home-bread">Home</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-area fix bg-color page-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h3>our projects</h3>
                <p>Dummy text is also used to demonstrate the appearance of different typefaces and layouts</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="blog-grid home-blog">
              {
                allProjects?.map((p) => {
                  return (
                    <div className="col-md-4 col-sm-6 col-xs-12" key={p?._id}>
                      <div className="single-blog">
                        <div className="blog-image">
                          <Link to={`/projectdetails/${p._id}`} className="image-scale">
                              <img src={`http://localhost:4000/app/file/projects/${p?.file}`} alt={p?.name} />
                          </Link>
                        </div>
                        <div className="blog-content">
                          <div className="blog-meta">
                            <span className="date-type">
                              <i className="fa fa-calendar" />
                              {p?.duration}
                            </span>
                            <span className="comments-type">
                              <i className="fa fa-comment-o" />
                              {p?.etat}
                            </span>
                          </div>
                             <Link to={`/projectdetails/${p._id}`}>
                            <h4>{p?.name}</h4>
                             </Link>

                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}