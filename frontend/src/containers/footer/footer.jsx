/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer" id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-top-bg row">
              <div className="col-md-6 col-lg-6 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/premium.png"}
                    className="img-fluid"
                  />
                </div>
                <div className="footer-box-content">
                  <h3>Get Premium</h3>
                  <p>1010 Avenue</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/message.png"}
                    className="img-fluid"
                  />
                </div>
                <div className="footer-box-content">
                  <h3>Unlimited Acess to Messages</h3>
                  <p>(+87) 847-291-4353</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 offset-md-3 offset-lg-0 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/support.png"}
                    className="img-fluid"
                  />
                </div>
                <div className="footer-box-content">
                  <h3>Get Support</h3>
                  <p>tax@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-top">
          <div className="container">
            <div className="footer-top-bg row">
              <div className="col-lg-4 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/premium.png"}
                    className="img-fluid"
                  ></img>
                </div>
                <div className="footer-box-content">
                  <h3>Get Premium</h3>
                  <p>1010 Avenue</p>
                </div>
              </div>
              <div className="col-lg-4 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/message.png"}
                    className="img-fluid"
                  ></img>
                </div>
                <div className="footer-box-content">
                  <h3>Unlimited Acess to Messages</h3>
                  <p>(+87) 847-291-4353</p>
                </div>
              </div>
              <div className="col-lg-4 footer-box">
                <div className="image">
                  <img
                    src={base + "assets/images/support.png"}
                    className="img-fluid"
                  ></img>
                </div>
                <div className="footer-box-content">
                  <h3>Get Support</h3>
                  <p>tax@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="footer-main bg-overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12 footer-widget footer-about">
                <div className="footer-logo mb-4">
                  <a href="index.php">
                    <img
                      src={base + "assets/images/footer-logo.png"}
                      className="img-fluid"
                      alt="img-logo"
                    ></img>
                  </a>
                </div>
                <p className="text-justify text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur unde reprehenderit aperiam quaerat fugiat
                  repudiandae explicabo animi minima fuga beatae illum eligendi
                  incidunt consequatur.
                </p>
                <div className="footer-social">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="icon icon-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon icon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon icon-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 footer-widget pl-3 pl-lg-5">
                <h3 className="widget-title">Useful Links</h3>
                <ul className="list-dash">
                  <li>
                    <a href="about-us.php">About Us</a>
                  </li>
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li>
                  <li>
                    <Link to="/termsConditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-12 footer-widget">
                <h3 className="widget-title">Subscribe</h3>
                <div className="newsletter-introtext">
                  Don’t miss to subscribe to our new feeds, kindly fill the form
                  below.
                </div>
                <form
                  className="newsletter-form"
                  id="newsletter-form"
                  action="#"
                  method="post"
                >
                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      id="newsletter-form-email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      autoComplete="off"
                    ></input>
                    <button className="btn btn-primary">
                      <i className="icon icon-paper-plane text-white"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="copyright-info text-center">
                  <span>
                    Copyright © 2020 OZVID Technologies Pvt. Ltd. All Rights
                    Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
