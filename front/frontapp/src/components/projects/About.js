import React from 'react'
import { Navbar } from '../../layouts/Navbar'
import { Footer } from '../../layouts/Footer'


export const About = () => {
  return (
   <>
<Navbar/>

  {/* Start breadcumb Area */}
  <div className="page-area">
    <div className="breadcumb-overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="breadcrumb text-center">
            <div className="section-headline white-headline">
              <h3>About us</h3>
            </div>
            <ul className="breadcrumb-bg">
              <li className="home-bread">Home</li>
              <li>About us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End breadcumb Area */}
  {/* about-area start */}
  <div className="about-area page-padding">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="about-image">
            <img src="img/about/ab.jpg" alt />
            <div className="video-content">
              <a href="https://www.youtube.com/watch?v=O33uuBh6nXA" className="video-play vid-zone">
                <i className="fa fa-play" />
              </a>
            </div>
          </div>
        </div>
        {/* column end */}
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="about-content">
            <h3>A Investment firm is a business of one or more experts that provides professional investment service</h3>
            <p>The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programmes can generate dummy text using the starting sequence "Lorem ipsum". Fortunately, the phrase 'Lorem Ipsum' is now recognized by electronic pre-press systems and, when found, an alarm can be raised.</p>
            <div className="about-details">
              <ul className="marker-list">
                <li>The phrasal sequence of the Lorem Ipsum text.</li>
                <li>ducimus adipisci voluptas consectetur adipisicing.</li>
                <li>consectetur adipisicing elit praesentium maxime.</li>
                <li>programmes can generate dummy text using..</li>
              </ul>
            </div>
          </div>
        </div>
        {/* column end */}
      </div>
    </div>
  </div>
  {/* about-area end */}
  {/* Start About Area */}
  <div className="about-feature-area bg-color area-padding-2">
    <div className="container">
      {/* end Row */}
      <div className="row">
        <div className="about-mission">
          {/* Start column */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="mission-about">
              <div className="mission-icon">
                <i className="flaticon-004-bar-chart" />
              </div>
              <div className="mission-text">
                <h4>Our Mission</h4>
                <p>The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programme</p>
              </div>
            </div>
          </div>
          {/* Start column */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="mission-about">
              <div className="mission-icon">
                <i className="flaticon-031-release" />
              </div>
              <div className="mission-text">
                <h4>Our Vision</h4>
                <p>The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programme</p>
              </div>
            </div>
          </div>
          {/* Start column */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="mission-about">
              <div className="mission-icon">
                <i className="flaticon-023-management" />
              </div>
              <div className="mission-text">
                <h4>Our Experience</h4>
                <p>The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programme</p>
              </div>
            </div>
          </div>
          {/* End column */}
        </div>
      </div>
    </div>
  </div>
  {/* End About Area */}
  {/* Start Banner Area */}
  <div className="banner-area area-padding">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="banner-all area-80 text-center">
            <div className="banner-content">
              <h3>Our worldwide integration partner work with long time relationship </h3>
              <a className="banner-btn" href="#">Open new account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Banner Area */}
  {/* Start Feature Area */}
  <div className="feature-area bg-color fix area-padding">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="feature-content">
            <div className="feature-images">
              <img src="img/feature/f1.jpg" alt />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="feature-text">
            <h3>Your investment money more safe and secure</h3>
            <p>Replacing a  maintains the amount of lines. When replacing a selection. help agencies to define their new business objectives and then create. Replacing a  maintains the amount of lines. When replacing a selection. help agencies to define their new business objectives and then create. Replacing a  maintains the amount of lines. When replacing a selection. help agencies to define their new business objectives and then create. </p>
            <a className="feature-btn" href="#">Get started now</a>
          </div>
        </div>
      </div>
      <div className="row margin-row">
        <div className="col-md-6 col-sm-6 hidden-xs">
          <div className="feature-text">
            <h3>Risk free investment system of our policy</h3>
            <p>Replacing a  maintains the amount of lines. When replacing a selection. help agencies to define their new business objectives and then create</p>
            <ul>
              <li><a href="#">Innovation idea latest business tecnology</a></li>
              <li><a href="#">Digital content marketing online clients plateform</a></li>
              <li><a href="#">Safe secure services for you online email account</a></li>
            </ul>
            <a className="feature-btn" href="#">Learn about more</a>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="overview-images">
            <canvas id="bissChart" width={300} height={240} />
          </div>
        </div>
        {/* End Column */}
        <div className="hidden-md hidden-lg hidden-sm col-xs-12">
          <div className="feature-text">
            <h3>Easily grow your business earn more money</h3>
            <p>Replacing a  maintains the amount of lines. When replacing a selection. help agencies to define their new business objectives and then create</p>
            <ul>
              <li><a href="#">Innovation idea latest business tecnology</a></li>
              <li><a href="#">Digital content marketing online clients plateform</a></li>
              <li><a href="#">Safe secure services for you online email account</a></li>
            </ul>
            <a className="feature-btn" href="#">Learn more</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer/>
</>

  )
}
