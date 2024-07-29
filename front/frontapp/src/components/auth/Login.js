import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
      <div>
        <div className="page-area">
          <div className="breadcumb-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="breadcrumb text-center">
                  <div className="section-headline white-headline">
                    <h3>Login</h3>
                  </div>
                  <ul className="breadcrumb-bg">
                    <li className="home-bread">Home</li>
                    <li>Login</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End breadcumb Area */}
        {/* Start Slider Area */}
        <div className="login-area page-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="login-page">
                  <div className="login-form">
                    <h4 className="login-title">LOGIN</h4>
                    <div className="row">
                      <form
                        id="contactForm"
                        method="POST"
                        action="http://rockstheme.com/rocks/aievari-live/contact.php"
                        className="log-form"
                      >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Username"
                            required
                            data-error="Please enter your username"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="password"
                            id="msg_subject"
                            className="form-control"
                            placeholder="Password"
                            required
                            data-error="Please enter your password"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <a className="text-muted" href="#">
                         
                          </a>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            id="submit"
                            className="login-btn"
                          >
                            Login
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          />
                          <div className="clearfix" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="clear" />
                          <div className="separetor">
                            <span>Don't have an account?</span>
                          </div>
                          <div className="acc-not">
                            <Link to="/signup">Sign up</Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
