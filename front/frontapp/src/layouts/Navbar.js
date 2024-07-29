import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <header className="header-one">
        {/* Start top bar */}
        <div className="topbar-area fix hidden-xs">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="topbar-left">
                  <ul>
                    <li><a href="mailto:info@aievari4.com"><i className="fa fa-envelope" /> info@aievari4.com</a></li>
                    <li><a href="tel:+9096549805"><i className="fa fa-phone" /> +909-654-9805</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="topbar-right">
                  <div className="top-social">
                    <ul>
                      <li><a href="#" aria-label="Skype"><i className="fa fa-skype" /></a></li>
                      <li><a href="#" aria-label="Pinterest"><i className="fa fa-pinterest" /></a></li>
                      <li><a href="#" aria-label="Google"><i className="fa fa-google" /></a></li>
                      <li><a href="#" aria-label="Twitter"><i className="fa fa-twitter" /></a></li>
                      <li><a href="#" aria-label="Facebook"><i className="fa fa-facebook" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End top bar */}
        
        {/* header-area start */}
        <div id="sticker" className="header-area hidden-xs">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="row">
                  {/* logo start */}
                  <div className="col-md-3 col-sm-3">
                    <div className="logo">
                      {/* Brand */}
                      <Link className="navbar-brand page-scroll white-logo" to="/">
                        <img src="img/logo/logo3.png" alt="Logo" />
                      </Link>
                      <Link className="navbar-brand page-scroll black-logo" to="/">
                        <img src="img/logo/logo.png" alt="Logo" />
                      </Link>
                    </div>
                    {/* logo end */}
                  </div>
                  
                  <div className="col-md-9 col-sm-9">
                    <div className="header-right-link">
                      <Link className="s-menu" to="/login">Login</Link>
                    </div>
                    
                    {/* mainmenu start */}
                    <nav className="navbar navbar-default">
                      <div className="collapse navbar-collapse" id="navbar-example">
                        <div className="main-menu">
                          <ul className="nav navbar-nav navbar-right">
                            <li><Link className="pages" to="/">Home</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link className="pages" to="/projects">Projects</Link></li> {/* Link to /projects */}
                            <li><a className="pages" href="#">Dashboard</a> {/* Changed "Pages" to "Dashboard" */}
                              <ul className="sub-menu">
                                <li><Link to="/add-categories">Add Categories</Link></li>
                                <li><Link to="/add-projects">Add Projects</Link></li>
                                <li><Link to="/add-tasks">Add Tasks</Link></li>
                                <li><Link to="/add-permissions">Add Permissions</Link></li>
                                <li><Link to="/add-types">Add Types</Link></li>
                                <li><Link to="/listcategories">List Categories</Link></li> {/* New link */}
                                <li><Link to="/listprojects">List Projects</Link></li> {/* New link */}
                                <li><Link to="/listtasks">List Tasks</Link></li> {/* New link */}
                                <li><Link to="/listpermissions">List Permissions</Link></li> {/* New link */}
                                <li><Link to="/listtypes">List Types</Link></li> {/* New link */}
                                <li><Link to="/listemployee">List Employee</Link></li> {/* New link */}
                              </ul>
                            </li>
                            <li><Link to="/contact">Contact</Link></li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                    {/* mainmenu end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header-area end */}
        
        {/* mobile-menu-area start */}
        <div className="mobile-menu-area hidden-lg hidden-md hidden-sm">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mobile-menu">
                  <div className="logo">
                    <Link to="/"><img src="img/logo/logo.png" alt="Logo" /></Link>
                  </div>
                  <nav id="dropdown">
                    <ul>
                      <li><Link className="pages" to="/">Home</Link></li>
                      <li><Link to="/about">About us</Link></li>
                      <li><Link className="pages" to="/projects">Projects</Link></li> {/* Link to /projects */}
                      <li><a className="pages" href="#">Dashboard</a> {/* Changed "Pages" to "Dashboard" */}
                        <ul className="sub-menu">
                          <li><Link to="/add-categories">Add Categories</Link></li>
                          <li><Link to="/add-projects">Add Projects</Link></li>
                          <li><Link to="/add-tasks">Add Tasks</Link></li>
                          <li><Link to="/add-permissions">Add Permissions</Link></li>
                          <li><Link to="/add-types">Add Types</Link></li>
                          <li><Link to="/listcategories">List Categories</Link></li> {/* New link */}
                          <li><Link to="/listprojects">List Projects</Link></li> {/* New link */}
                          <li><Link to="/listtasks">List Tasks</Link></li> {/* New link */}
                          <li><Link to="/listpermissions">List Permissions</Link></li> {/* New link */}
                          <li><Link to="/listtypes">List Types</Link></li> {/* New link */}
                          <li><Link to="/listemployee">List Employee</Link></li> {/* New link */}
                        </ul>
                      </li>
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile-menu-area end */}
      </header>
    </>
  );
};
