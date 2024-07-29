import React from 'react'
import { Footer } from '../../layouts/Footer'
import { Navbar } from '../../layouts/Navbar'

export const AddCategory = () => {
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
                                        <div id="contactForm"  className="contact-form ">
                                            <div className="col-md-12 col-sm-12 col-xs-12 ">
                                                <input type="text" id="msg_subject" className="form-control" placeholder="Category name" required data-error="Please enter your message subject" />
                                                <div className="help-block with-errors" />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                                <button type="submit" id="submit" className="add-btn contact-btn">Add</button>
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








<Footer/>



    
    </>
  )
}
