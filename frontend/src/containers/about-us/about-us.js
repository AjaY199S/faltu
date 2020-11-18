/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import Slider from "react-slick";
export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
    };
    return (
      <section className="about-us">
        <div className="site-section">
          <div className="container">
            <div className="row row-50 align-items-lg-center justify-content-xl-between">
              <div className="col-lg-6 text-center mb-5 pb-5">
                <div className="box-images">
                  <div className="box-images-item box-images-1">
                    <img
                      src="/assets/images/couples-2.jpg"
                      alt="image"
                      width="282"
                      height="282"
                    />
                  </div>
                  <div
                    className="box-images-item box-images-2"
                    // style="transform: translate3d(0px, 20px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform: translate3d(0px, 20px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1);"
                  >
                    <img
                      src="/assets/images/couples-5.jpg"
                      alt="image"
                      width="240"
                      height="369"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 pl-4">
                <div className="border-primary text-left mb-3 pb-1">
                  <h2 className="font-weight-light text-primary">
                    About JoMuslim
                  </h2>
                </div>
                <p className="text-justify">
                  Welcome to JoMuslim.com. It is a specialist Muslim
                  matrimonials and matchmaking website that assists Muslim men
                  and women to find their perfect match anywhere in the world.
                </p>
                <p className="text-justify">
                  We understand your requirements and try to meet your criteria
                  from the Day 1. We are a leading Indian matrimonial
                  matchmaking service provider. Our experienced and highly
                  dedicated team is committed to provide 360 degree solutions to
                  all prospective Indian brides and grooms.
                </p>
                <a className="btn btn-common" href="#">
                  learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light why-choose">
          <div className="container">
            <div className="row">
              <div className="col-12 col-12 text-center border-primary mb-5">
                <h2 className="font-weight-light text-primary">
                  Why Choose Us
                </h2>
                <p>
                  JoMuslim is a specialist Muslim matrimonials and matchmaking
                  website that assists Muslim men and women to find their
                  perfect match anywhere in the world.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-block d-md-flex">
                <div className="listing vertical">
                  <a href="#" className="img d-block pt-5 mb-0 text-center">
                    <i className="icon icon-life-ring" aria-hidden="true"></i>{" "}
                  </a>
                  <div className="lh-content text">
                    <h3 className="text-center my-3">
                      <a href="listings-single.php">Help & Support</a>
                    </h3>
                    <address className="mb-2 text-justify">
                      We provide an exclusive matchmaking experience that
                      enables our users to find the perfect match for them
                      without any hassle. We believe that JoMuslim can help you
                      to find that special person in the world for whom you have
                      been waiting for all your life! All we ask is to give us a
                      chance!
                    </address>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-block d-md-flex">
                <div className="listing vertical">
                  <a href="#" className="img d-block pt-5 mb-0 text-center">
                    <i className="icon icon-search" aria-hidden="true"></i>
                  </a>
                  <div className="lh-content text">
                    <h3 className="text-center my-3">
                      <a href="#">Wider & Better Search Options</a>
                    </h3>
                    <address className="mb-2 text-justify">
                      We serve to all Indian communities in India. In a
                      short-span of time, we have become the first choice of all
                      Indian communities to search the perfect life partner with
                      ease. This is one of the best platforms to search and
                      connect with the special someone.
                    </address>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-block d-md-flex">
                <div className="listing vertical">
                  <a href="#" className="img d-block pt-5 mb-0 text-center">
                    <i className="icon icon-shield" aria-hidden="true"></i>{" "}
                  </a>
                  <div className="lh-content text">
                    <h3 className="text-center my-3">
                      <a href="#">Private, Secure & Anonymous</a>
                    </h3>
                    <address className="mb-2 text-justify">
                      We do not share your confidential information with other
                      users or third parties. We comply with General Data
                      Protection Regulation (GDPR).We are the first choice of
                      customers because of our customer centric approach and
                      higher authenticity.
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="agents site-section pb-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-box">
                  <div className="text-center border-primary">
                    <h2 className="text-center heading mb-4 font-weight-light text-primary pb-3">
                      Our Team
                    </h2>
                  </div>
                  <div className="title_border1"></div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="owl-carousel nonloop-block-13">
                  <Slider {...settings}>
                    <div className="d-block d-md-flex listing vertical mb-0 mb-2">
                      <div className="agents_box">
                        <div className="ouragents">
                          <img src="/assets/images/agent_1.png" alt="image" />
                          <div className="overlay"></div>
                          <div className="social_icon">
                            <nav>
                              <ul className="social">
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
                                    <i className="icon icon-linkedin"></i>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="agents_detail">
                          <h2>Vincent Fuller</h2>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            volu ptatem.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-block d-md-flex listing vertical mb-0">
                      <div className="agents_box">
                        <div className="ouragents">
                          <img src="/assets/images/agent_2.png" alt="image" />
                          <div className="overlay"></div>
                          <div className="social_icon">
                            <nav>
                              <ul className="social">
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
                                    <i className="icon icon-linkedin"></i>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="agents_detail">
                          <h2>Doug Eberhart</h2>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            volu ptatem.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical mb-0">
                      <div className="agents_box">
                        <div className="ouragents">
                          <img src="/assets/images/agent_3.png" alt="image" />
                          <div className="overlay"></div>
                          <div className="social_icon">
                            <nav>
                              <ul className="social">
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
                                    <i className="icon icon-linkedin"></i>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="agents_detail">
                          <h2>David Goldberg</h2>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            volu ptatem.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical mb-0">
                      <div className="agents_box">
                        <div className="ouragents">
                          <img src="/assets/images/agent_4.png" alt="image" />
                          <div className="overlay"></div>
                          <div className="social_icon">
                            <nav>
                              <ul className="social">
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
                                    <i className="icon icon-linkedin"></i>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="agents_detail">
                          <h2>John Foran</h2>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            volu ptatem.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
