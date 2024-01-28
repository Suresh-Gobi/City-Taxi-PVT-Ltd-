import React from 'react'
import './style.css'

export default function home() {
  return (
    <div>
      <div className="hero_area">
      {/* header section starts */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <a className="navbar-brand" href="index.html">
              <span>Urotaxi</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="service.html">
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="news.html">
                      News
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* end header section */}
      {/* slider section */}
      <section className="slider_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="box">
                <div className="detail-box">
                  <h4>Welcome to</h4>
                  <h1>UROTAXI</h1>
                </div>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="3"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="4"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="img-box">
                        <img
                          src="images/slider-img.png"
                          alt=""
                          className="w-full"
                        />
                      </div>
                    </div>
                    {/* Additional Carousel Items */}
                  </div>
                </div>

                <div className="btn-box">
                  <a href="" className="btn-1">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="slider_form">
                <h4>Get A Taxi Now</h4>
                <form action="">
                  <input
                    type="text"
                    placeholder="Car Type"
                    className="mb-2 p-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Pick Up Location"
                    className="mb-2 p-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Drop Location"
                    className="mb-2 p-2 w-full"
                  />
                  <div className="btm_input">
                    <input
                      type="text"
                      placeholder="Your Phone Number"
                      className="mb-2 p-2 w-full"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded">
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end slider section */}
      {/* about section */}
      <section className="about_section layout_padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5 offset-lg-2 offset-md-1">
              <div className="detail-box">
                <h2>About<br />Taxi Company</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <a href="" className="text-white">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src="images/about-img.png" alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about section */}
      {/* service section */}
      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Our<br />Taxi Services</h2>
          </div>
          <div className="service_container">
            <div className="box">
              <div className="img-box">
                <img src="images/delivery-man.png" alt="" className="w-full" />
              </div>
              <div className="detail-box">
                <h5>Private Driver</h5>
                <p>Lorem ipsum dolor sit ame</p>
                <a href="">Read More</a>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="images/airplane.png" alt="" className="w-full" />
              </div>
              <div className="detail-box">
                <h5>Airport Transfer</h5>
                <p>Lorem ipsum dolor sit ame</p>
                <a href="">Read More</a>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="images/backpack.png" alt="" className="w-full" />
              </div>
              <div className="detail-box">
                <h5>Luggage Transfer</h5>
                <p>Lorem ipsum dolor sit ame</p>
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end service section */}
      {/* news section */}
      <section className="news_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Our<br />News</h2>
          </div>
          <div className="news_container">
            <div className="box">
              <div className="date-box">
                <h6>01 Nov 2019</h6>
              </div>
              <div className="img-box">
                <img src="images/news-img.jpg" alt="" className="w-full" />
              </div>
              <div className="detail-box">
                <h6>Eiusmod tempor incididunt</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
              </div>
            </div>
            {/* Additional News Items */}
          </div>
        </div>
      </section>
      {/* end news section */}
      {/* client section */}
      <section className="client_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container">
            <h2>What<br />Client<br />Says</h2>
          </div>
          <div className="client_container">
            <div className="carousel-wrap ">
              <div className="owl-carousel">
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="images/client-1.png"
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="detail-box">
                      <h3>Aliqua</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et amet,
                        consectetur adipiscing
                      </p>
                      <img
                        src="images/quote.png"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="images/client-2.png"
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="detail-box">
                      <h3>Liqua</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et amet,
                        consectetur adipiscing
                      </p>
                      <img
                        src="images/quote.png"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end client section */}
      {/* contact section */}
      <section className="contact_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container">
            <h2>Any Problems<br />Any Questions</h2>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 offset-md-1">
              <div className="contact_form">
                <h4>Get In touch</h4>
                <form action="">
                  <input type="text" placeholder="Name" className="mb-2 p-2 w-full" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="mb-2 p-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Message"
                    className="message_input mb-2 p-2 w-full"
                  />
                  <div className="btm_input">
                    <input
                      type="text"
                      placeholder="Your Phone Number"
                      className="mb-2 p-2 w-full"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 px-0">
              <div className="img-box">
                <img src="images/contact-img.png" alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end contact section */}
      {/* app section */}
      <section className="app_section layout_padding2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <h2>Download Our app</h2>
                <div className="text-box">
                  <h5>details</h5>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when
                    distribution of letters
                  </p>
                </div>
                <div className="text-box">
                  <h5>How it works</h5>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when
                    distribution of letters
                  </p>
                </div>
                <div className="btn-box">
                  <a href="">
                    <img src="images/playstore.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/appstore.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src="images/mobile.png" alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}
