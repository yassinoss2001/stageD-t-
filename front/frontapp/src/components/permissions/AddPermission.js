import React from 'react'
import { Footer } from '../../layouts/Footer'
import { Navbar } from '../../layouts/Navbar'

export const AddPermission = () => {
  const types = [
    { id: 1, name: 'Type A' },
    { id: 2, name: 'Type B' },
    { id: 3, name: 'Type C' }
  ];

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
                    <h2 className='text-center mb-5'>Add a Permission</h2>
                    <div id="contactForm" className="contact-form">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="file" id="file" className="form-control" required data-error="Please upload a file" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea id="reason" className="form-control" placeholder="Reason" required data-error="Please enter the reason" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="date" id="dateDeb" className="form-control" placeholder="Start Date" required data-error="Please enter the start date" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="date" id="dateFin" className="form-control" placeholder="End Date" required data-error="Please enter the end date" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input type="text" id="status" className="form-control" placeholder="Status" required data-error="Please enter the status" />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <select id="type" className="form-control" required data-error="Please select a type">
                          <option value="">Select Type</option>
                          {types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                        <div className="help-block with-errors" />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="submit" id="submit" className="add-btn contact-btn">Add Permission</button>
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
