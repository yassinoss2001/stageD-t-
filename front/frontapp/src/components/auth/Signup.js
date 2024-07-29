import React from 'react';
import { Link } from 'react-router-dom';

export const Signup = () => {
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
                    <h3>Sign up</h3>
                  </div>
                  <ul className="breadcrumb-bg">
                    <li className="home-bread">Home</li>
                    <li>Sign up</li>
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
                    <h4 className="login-title">Signup</h4>
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
                            data-error="Please enter your name"
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
                          <a className="text-muted" href="#"></a>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            id="submit"
                            className="login-btn"
                          >
                            Signup
                          </button>
                          <div id="msgSubmit" className="h3 text-center hidden" />
                          <div className="clearfix" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="clear" />
                          <div className="separetor">
                            <span>Already have an account?</span>
                          </div>
                          <div className="acc-not">
                            <Link to="/login">Login</Link>
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
        {/* Start Footer Area */}
        <footer className="footer1">
          <div className="footer-area">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-12">
                  <div className="footer-content logo-footer">
                    <div className="footer-head">
                      <div className="footer-logo">
                        <a className="footer-black-logo" href="#">
                          <img src="img/logo/logo.png" alt="Logo" />
                        </a>
                      </div>
                      <p>
                        Are you looking for professional advice for your new business? We offer expert consultations and support.
                      </p>
                      <div className="subs-feilds">
                        <div className="suscribe-input">
                          <input
                            type="email"
                            className="email form-control width-80"
                            id="sus_email"
                            placeholder="Type Email"
                          />
                          <button
                            type="submit"
                            id="sus_submit"
                            className="add-btn"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
