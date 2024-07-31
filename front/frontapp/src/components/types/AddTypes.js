import React, { useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import typeService from '../../services/typeService';

export const AddTypes = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (name.trim() === '') {
      setError('Please enter the type name');
      return;
    }

    try {
      await typeService.addType({ name });
      setSuccess('Type added successfully');
      setName(''); // Clear the input field
    } catch (err) {
      setError('Failed to add type');
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
                <div className="breadcrumb text-center"></div>
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
                    <h2 className="text-center mb-5">Add a Type</h2>
                    <div id="contactForm" className="contact-form">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          data-error="Please enter the type name"
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button
                          type="submit"
                          id="submit"
                          className="add-btn contact-btn"
                          onClick={handleSubmit}
                        >
                          Add Type
                        </button>
                        {error && <p className="text-danger">{error}</p>}
                        {success && <p className="text-success">{success}</p>}
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
