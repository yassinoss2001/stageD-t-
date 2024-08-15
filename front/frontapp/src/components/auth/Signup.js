import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Navbar } from '../../layouts/Navbar';
import employeeService from '../../services/employeeService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate()

  const handleSignup = async () => {
    const employeeData = {
      role:"Employee",
      firstName,
      lastName,
      email,
      phone,
      adress,
      password,
    };

    try {
     
      const res = await employeeService.addEmployee(employeeData);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
     
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdress("");
      setPassword("");
      console.log("resss",res)
      if(res.status===201){
        navigate('/login')
      }
    } catch (err) {
      console.error('Error adding employee:', err);  
      notification.error({
        message: 'Error',
        description: 'Failed to add employee',
      });
    }
  };

  return (
    <>
      <Navbar />
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
      <div className="signup-area">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="signup-form">
                <h2 className="text-center mb-5">Sign up</h2>
                <div className="row">
             
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      id="adress"
                      className="form-control"
                      placeholder="Address"
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                    <Button
                      type="primary"
                      className="signup-btn"
                      onClick={handleSignup}
                    >
                      Signup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
