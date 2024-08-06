import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService'; // Import the service
import Swal from 'sweetalert2'; // Import SweetAlert2


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  

  const signin=()=>{
    let data={
      email:email,
      password:password,
    }
    authService.login(data).then((res)=>{
        console.log(res , "resss***");
        if(res.status === 201){
          localStorage.setItem("user" , JSON.stringify(res.data))

          navigate("/project")
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are  logged",
            showConfirmButton: false,
            timer: 1500
          });
        }
    }).catch((err)=>{
        console.log(err , "err");
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500
        });
    })
  }
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
                      <div
                        id="contactForm"
                        className="log-form"
                      >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            id="submit"
                            className="login-btn"
                            onClick={signin}
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
                      </div>
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
