/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Slider from "react-slick";
import base from "../../globals/base";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import {
  ERRORMSG,
  SERVERURL,
  PERPAGE,
  DIFFYRS,
  AGE,
  HEIGHT,
} from "../../globals/constant";
const IMG = base + "assets/images/customer.png";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredProfile: [],
    };
  }
  loadAge = () => {
    return AGE.map((data, key) => {
      return (
        <option value={data} key={key}>
          {data}
        </option>
      );
    });
  };

  componentWillMount = async () => {
    await UserService.featuredProfiles()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          responseData.data.map((data) => {
            if (data.password != "") {
              let details = JSON.parse(data.password);
              if (details.height && details.height != "") {
                function isHeight(datas) {
                  return datas.id == details.height;
                }
                details.height = HEIGHT.find(isHeight);
              }
              data.password = details;
            }
            let d1 = new Date(data.dob);
            data.dob = DIFFYRS(d1);
            if (data.profileImg) {
              data.profileImg = SERVERURL + data.profileImg;
            } else {
              data.profileImg = IMG;
            }
          });
          this.setState({ featuredProfile: responseData.data });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  viewDetails = (data) => {
    this.props.history.push({
      pathname: "/message-detail",
      state: {
        record: data,
      },
    });
  };

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
    };
    const { featuredProfile } = this.state;
    return (
      <div className="landing-page animated fadeInUp">
        <div
          className="site-blocks-cover overlay"
          style={{
            backgroundImage: "url(" + base + "assets/images/banner1.jpeg" + ")",
            backgroundPosition: "50% -25px",
          }}
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container align-items-center justify-content-center text-center d-flex banner-container">
            <div className="row">
              <div className="col-md-12">
                <div className="row justify-content-center mb-4">
                  <div className="col-md-8 text-center">
                    <h1 className="banner-heading">
                      Find your perfect Life Partner
                    </h1>
                    <p className="banner-text mb-4">
                      Join us to find your spouse with confidence. Not many
                      other websites offer such level of confidentiality,
                      security and trust.
                    </p>
                  </div>
                </div>
                <div
                  className="form-search-wrap"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <form method="post">
                    <div className="row align-items-center">
                      <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                        <div className="select-wrap">
                          <span className="icon">
                            <span className="icon-keyboard_arrow_down"></span>
                          </span>
                          <select className="form-control rounded">
                            <option>What are you looking for?</option>
                            <option>Bride</option>
                            <option>Groom</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 mb-xl-0 col-xl-2">
                        <div className="select-wrap">
                          <span className="icon">
                            <span className="icon-keyboard_arrow_down"></span>
                          </span>
                          <select className="form-control rounded">
                            <option>Age from</option>
                            {this.loadAge()}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 mb-xl-0 col-xl-2">
                        <div className="select-wrap">
                          <span className="icon">
                            <span className="icon-keyboard_arrow_down"></span>
                          </span>
                          <select className="form-control rounded">
                            <option>Age to</option>
                            {this.loadAge()}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                        <div className="select-wrap">
                          <span className="icon">
                            <span className="icon-keyboard_arrow_down"></span>
                          </span>
                          <select className="form-control rounded">
                            <option>Select a religion</option>
                            <option>Doesn't Matter</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Jain</option>
                            <option>Sikh</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-2 ml-auto text-right">
                        <input
                          type="submit"
                          className="btn btn-primary btn-block rounded text-white"
                          value="Search"
                        ></input>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center border-primary mb-5">
                <h2 className="font-weight-light text-primary">
                  Featured Profiles
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12  block-13">
                <div className=" nonloop-block-13">
                  <Slider {...settings}>
                    {featuredProfile.map((users, key) => (
                      <div
                        key={key}
                        className="d-block d-md-flex listing vertical"
                      >
                        <a
                          onClick={(event) => this.viewDetails(users._id)}
                          className="img d-block"
                          style={{
                            backgroundImage: `url(${users.profileImg})`,
                          }}
                        ></a>
                        <div className="lh-content text-center">
                          <h3>
                            <a href="#">Profile ID : MI-3232332</a>
                          </h3>
                          <address className="mb-2">
                            Age/Height : {users.dob ? users.dob : "NA"}/
                            {users.password != ""
                              ? users.password.height
                                ? users.password.height
                                  ? users.password.height.value
                                  : "NA"
                                : "NA"
                              : "NA"}
                          </address>
                          <address>
                            {users.city ? users.city + ", " : ""}
                            {users.province ? users.province + "," : ""}
                            {users.country ? users.country : ""}
                          </address>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="works-section site-section">
          <div className="container">
            <div className="works-title text-center border-primary how-work-title">
              <h2 className="font-weight-light text-white pb-2 mt-0">
                How It works
              </h2>
            </div>

            <div className="row px-3 px-lg-0">
              <div className="col-lg-3 col-md-6 col-sm-6 mb-3 mb-lg-0 text-center">
                <div className="works-item-content">
                  <div className="works-number">
                    <a href="#" className="number-btn">
                      <span>1</span>
                    </a>
                  </div>

                  <h3>Create A Profile</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>

                  <div className="works-btn">
                    <a href="#" className="works-btn-one">
                      Learn More <i className="flaticon-right-arrow-1"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-3 mb-lg-0  text-center">
                <div className="works-item-content">
                  <div className="works-number">
                    <a href="#" className="number-btn">
                      <span>2</span>
                    </a>
                  </div>

                  <h3>Browse Photos</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>

                  <div className="works-btn">
                    <a href="#" className="works-btn-one">
                      Learn More <i className="flaticon-right-arrow-1"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-3 mb-lg-0  text-center">
                <div className="works-item-content">
                  <div className="works-number">
                    <a href="#" className="number-btn">
                      <span>3</span>
                    </a>
                  </div>

                  <h3>Start Communicating</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>

                  <div className="works-btn">
                    <a href="#" className="works-btn-one">
                      Learn More <i className="flaticon-right-arrow-1"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 mb-3 mb-lg-0  text-center">
                <div className="works-item-content">
                  <div className="works-number">
                    <a href="#" className="number-btn">
                      <span>4</span>
                    </a>
                  </div>
                  <h3>Get Connect With One</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>

                  <div className="works-btn">
                    <a href="#" className="works-btn-one">
                      Learn More <i className="flaticon-right-arrow-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section" data-aos="fade">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-7 text-center border-primary">
                <h2 className="font-weight-light text-primary">
                  Be inspired by Real Weddings
                </h2>
                <p className="color-black-opacity-5">
                  Find inspiration for your Special Day. Yours could be the next
                  Success Story.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 mb-lg-4 col-lg-4">
                <div className="listing-item">
                  <div className="listing-image">
                    <img
                      src={"assets/images/couples-1.jpg"}
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="listing-item-content">
                    <h2 className="mb-1">
                      <a href="#">Irfan &amp; Aaliya</a>
                    </h2>
                    <span className="address">
                      Thanks a ton joMuslim for .....
                    </span>
                    <a className="px-3 mt-3 category" href="#">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 mb-lg-4 col-lg-4">
                <div className="listing-item">
                  <div className="listing-image">
                    <img
                      src={"assets/images/couples-2.jpg"}
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="listing-item-content">
                    <h2 className="mb-1">
                      <a href="#">Sanyam &amp; Mansi</a>
                    </h2>
                    <span className="address">
                      Thanks a ton joMuslim for .....
                    </span>
                    <a className="px-3 mt-3 category" href="#">
                      Real Estate
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4 mb-lg-4 col-lg-4">
                <div className="listing-item">
                  <div className="listing-image">
                    <img
                      src={"assets/images/couples-3.jpg"}
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="listing-item-content">
                    <h2 className="mb-1">
                      <a href="#">Aaminah &amp; Aasim</a>
                    </h2>
                    <span className="address">
                      Thanks a ton joMuslim for .....
                    </span>
                    <a className="px-3 mt-3 category" href="#">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 mb-lg-4 col-lg-6 row-2">
                <div className="listing-item">
                  <div className="listing-image">
                    <img
                      src={"assets/images/couples-4.jpg"}
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="listing-item-content">
                    <h2 className="mb-1">
                      <a href="#">Abbas &amp; Abdel</a>
                    </h2>
                    <span className="address">
                      Thanks a ton joMuslim for .....
                    </span>
                    <a className="px-3 mt-3 category" href="#">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 mb-lg-4 col-lg-6 row-2">
                <div className="listing-item">
                  <div className="listing-image">
                    <img
                      src={"assets/images/couples-5.jpg"}
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="listing-item-content">
                    <h2 className="mb-1">
                      <a href="#">Abdul Matin &amp; Aaisha</a>
                    </h2>
                    <span className="address">
                      Thanks a ton joMuslim for .....
                    </span>
                    <a className="px-3 mt-3 category" href="#">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-pink app-screen">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 left text-center">
                <img src={"assets/images/screen.png"}></img>
              </div>
              <div className="col-lg-7 right text-white">
                <h2>Matrimonial mobile app on your smartphone!</h2>
                <p className="pb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>
                <div>
                  <label className="pb-2">Available on iOS and Android </label>
                  <ul className="pl-0">
                    <li className="pr-3">
                      <a href="#">
                        <img src={"assets/images/google-store.png"}></img>
                      </a>
                    </li>
                    <li className="pr-3">
                      <a href="#">
                        <img src={"assets/images/app-store.png"}></img>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-white pb-150">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-7 text-center border-primary">
                <h2 className="font-weight-light text-primary">Testimonials</h2>
              </div>
            </div>
            <div className="slide-one-item home-slider ">
              <div>
                <div className="testimonial">
                  <figure className="mb-4">
                    <img
                      src={"assets/images/featured-profile-1.jpg"}
                      alt="Image"
                      className="img-fluid mb-3"
                    ></img>
                    <p>Irfaan</p>
                  </figure>
                  <blockquote>
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Consectetur unde reprehenderit aperiam quaerat
                      fugiat repudiandae explicabo animi minima fuga beatae
                      illum eligendi incidunt consequatur. Amet dolores
                      excepturi earum unde iusto.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
              <div>
                <div className="testimonial">
                  <figure className="mb-4">
                    <img
                      src={"assets/images/featured-profile-2.jpg"}
                      alt="Image"
                      className="img-fluid mb-3"
                    ></img>
                    <p>Aamira</p>
                  </figure>
                  <blockquote>
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Consectetur unde reprehenderit aperiam quaerat
                      fugiat repudiandae explicabo animi minima fuga beatae
                      illum eligendi incidunt consequatur. Amet dolores
                      excepturi earum unde iusto.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
              <div>
                <div className="testimonial">
                  <figure className="mb-4">
                    <img
                      src={"assets/images/featured-profile-1.jpg"}
                      alt="Image"
                      className="img-fluid mb-3"
                    ></img>
                    <p>Irfaan</p>
                  </figure>
                  <blockquote>
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Consectetur unde reprehenderit aperiam quaerat
                      fugiat repudiandae explicabo animi minima fuga beatae
                      illum eligendi incidunt consequatur. Amet dolores
                      excepturi earum unde iusto.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
              <div>
                <div className="testimonial">
                  <figure className="mb-4">
                    <img
                      src={"assets/images/featured-profile-2.jpg"}
                      alt="Image"
                      className="img-fluid mb-3"
                    ></img>
                    <p>Aamira</p>
                  </figure>
                  <blockquote>
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Consectetur unde reprehenderit aperiam quaerat
                      fugiat repudiandae explicabo animi minima fuga beatae
                      illum eligendi incidunt consequatur. Amet dolores
                      excepturi earum unde iusto.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
