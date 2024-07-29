import React from 'react'

export const Footer = () => {
  return (
   <>
 
  {/* Start Footer Area */}
  <footer className="footer1">
    <div className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-5 col-xs-12">
            <div className="footer-content logo-footer">
              <div className="footer-head">
                <div className="footer-logo">
                  <a className="footer-black-logo" href="#"><img src="img/logo/logo.png" alt /></a>
                </div>
                <p>
                  Are you looking for professional advice for your new business. Are you looking for professional advice for your new business. Are you looking for professional advice for your new business.
                </p>
                <div className="subs-feilds">
                  <div className="suscribe-input">
                    <input type="email" className="email form-control width-80" id="sus_email" placeholder="Type Email" />
                    <button type="submit" id="sus_submit" className="add-btn">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end single footer */}
          <div className="col-md-4 col-sm-3 col-xs-12">
            <div className="footer-content">
              <div className="footer-head">
                <h4>Services Link</h4>
                <ul className="footer-list">
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Services </a></li>
                  <li><a href="#">Events</a></li>
                  <li><a href="#">Promotion</a></li>
                  <li><a href="#">Transition</a></li>
                  <li><a href="#">Social Media</a></li>
                </ul>
                <ul className="footer-list hidden-sm">
                  <li><a href="#">Customer Care</a></li>
                  <li><a href="#">Live chat</a></li>
                  <li><a href="#">Notification</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms &amp; Condition</a></li>
                  <li><a href="#">Contact us </a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* end single footer */}
          <div className="col-md-3 col-sm-4 col-xs-12">
            <div className="footer-content last-content">
              <div className="footer-head">
                <h4>Information</h4> 
                <div className="footer-contacts">
                  <p><span>Tel :</span> +0890-564-5644</p>
                  <p><span>Email :</span> info@aievari4.com</p>
                  <p><span>Location :</span> House- 65/4, London</p>
                </div> 
                <div className="footer-icons">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-area-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="copyright">
              <p>
                Copyright © 2020
                <a href="#">Aievari</a> All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* End Footer area */}
</>

  )
}
