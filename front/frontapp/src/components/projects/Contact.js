import React, { useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';




export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Implement form submission logic here

    // Reset form data after submission (if required)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <>
<Navbar/>



      <div className="page-area">
        <div className="breadcumb-overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="breadcrumb text-center">
                <div className="section-headline white-headline">
                  <h3>Contact us</h3>
                </div>
                <ul className="breadcrumb-bg">
                  <li className="home-bread">Home</li>
                  <li>Contact us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-area page-padding">
        <div className="container">
          <div className="row">
            <div className="contact-inner">
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-mobile" />
                    <p>
                      Call : +0011-564-543<br />
                      <span>Monday-Friday (10am-18pm)</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-envelope-o" />
                    <p>
                      Email : Aievar3@gmail.com<br />
                      <span>Web: www.rockstheme.com</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="contact-icon text-center">
                  <div className="single-icon">
                    <i className="fa fa-map-marker" />
                    <p>
                      Location : Newyork city<br />
                      <span>23 house/3 Road</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="map-area">
                <div id="googleMap" style={{width: '100%', height: 380}} />
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="contact-form">
                <div className="row">
                  <form id="contactForm" onSubmit={handleSubmit} className="contact-form">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        data-error="Please enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="help-block with-errors" />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input
                        type="email"
                        className="email form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        data-error="Please enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <div className="help-block with-errors" />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        id="msg_subject"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        required
                        data-error="Please enter your message subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <div className="help-block with-errors" />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        placeholder="Message"
                        className="form-control"
                        required
                        data-error="Write your message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                      <div className="help-block with-errors" />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                      <button type="submit" id="submit" className="add-btn contact-btn">Send Message</button>
                      <div id="msgSubmit" className="h3 text-center hidden" /> 
                      <div className="clearfix" />
                    </div>   
                  </form>  
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
