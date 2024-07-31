import React, { useState } from 'react';
import { Footer } from '../../layouts/Footer';
import { Navbar } from '../../layouts/Navbar';
import catergoryService from '../../services/catergoryService';
import { notification } from 'antd';

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName) {
      try {
        await catergoryService.addCategory({ name: categoryName });
        notification.success({
          message: 'Success',
          description: 'Category added successfully',
        });
        setCategoryName(''); // Optionally clear the input field
      } catch (error) {
        console.error('Error adding category:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to add category',
        });
      }
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
                    <h2 className='text-center mb-5'>Add Category</h2>
                    <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input 
                          type="text" 
                          id="msg_subject" 
                          className="form-control" 
                          placeholder="Category name" 
                          required 
                          value={categoryName}
                          onChange={handleInputChange}
                          data-error="Please enter your message subject" 
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="submit" id="submit" className="add-btn contact-btn">Add</button>
                        <div className="clearfix" />
                      </div>
                    </form>
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
