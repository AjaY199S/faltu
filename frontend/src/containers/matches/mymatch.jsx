import React from "react";
import Slider from "react-slick";
import { ERRORMSG, SERVERURL } from "../../globals/constant";
import * as UserService from "../../services/userAuthService";
import { AGE } from "../../globals/constant";

import showNotification from "../../services/notificationService"; // to show success notice

import base from "../../globals/base";
const IMG = base + "assets/images/customer.png";

export default class MyMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      mutualRecord: [],
      imgUrl: IMG,
      interestUserId: [],
      otherUserid: "",
      userDetails: "",
    };
  }

  componentWillMount = async () => {
    await UserService.checkLogin()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({ interestUserId: responseData.data.interestUserId });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
    await UserService.myMatches()
      .then((response) => {
        let responseDatas = response.data;

        if (responseDatas.success) {
          this.setState({ record: responseDatas.data });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });

    await UserService.mutualMatches()
      .then((response) => {
        let responseDatas = response.data;
        if (responseDatas.success) {
          this.setState({ mutualRecord: responseDatas.data });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };
  submitHandle = async (memberNumber, id) => {
    let obj = {
      profileViewdUserId: id,
    };
    await UserService.addviewPrfoile(obj)
      .then((response) => {
        let responseData = response.data;
        if (!responseData.success) {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
    this.props.history.push({
      pathname: "/user-details",
      state: {
        record: { memberNumber: memberNumber },
      },
    });
  };

  addInterest = async (id) => {
    let obj = {
      interestUserId: id,
    };
    await UserService.addInterest(obj)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  removeInterest = async (id) => {
    await UserService.removeInterest(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  viewDetails = (data) => {
    document.getElementById("close").click();
    this.props.history.push({
      pathname: "/message-detail",
      state: {
        record: data,
      },
    });
  };

  loadModal = async (data) => {
    this.setState({ otherUserid: data._id });
    await UserService.getOtherUserMedia(data._id)
      .then((response) => {
        let responseData = response.data;
        let newObj = {};
        if (responseData.success) {
          responseData.data.userDetails = data;
          newObj = responseData.data;
          newObj.userDetails = data;
        }
        this.setState({ userDetails: newObj });
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const {
      record,
      imgUrl,
      mutualRecord,
      interestUserId,
      otherUserid,
      userDetails,
    } = this.state;
    return (
      <div>
        <div className="bg-light banner-bottom border-bottom pt-5 pb-3">
          <div className="container">
            <div className="row form-group m-0 ml-auto">
              <label className="d-flex align-items-center label m-0">
                <strong>Order by</strong>
                <select className="col-md-3 form-control ml-3">
                  <option>Relevance</option>
                  <option>Last Active</option>
                  <option>Photos First</option>
                  <option>New Members first</option>
                </select>{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <section
          className="discover-matches bg-white"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="site-section">
            <div className="container">
              <div className="text-center border-primary">
                <h2 className="font-weight-light text-primary pb-3">
                  My Matches
                </h2>
              </div>
              {record.length > 0 ? (
                <div className="row">
                  {record.map((users, key) => (
                    <div className="col-md-6 col-lg-4" key={key}>
                      <div className="featured-box mb-4 mb-lg-0">
                        <figure>
                          <div className="icon">
                            {interestUserId.indexOf(users._id) != -1 ? (
                              <span
                                className="bg-green favorite"
                                title={"show interest in " + users.firstName}
                              >
                                <i
                                  className="icon-heart"
                                  onClick={(event) =>
                                    this.removeInterest(users._id)
                                  }
                                ></i>
                              </span>
                            ) : (
                              <span
                                className="bg-green"
                                title={"remove interest in " + users.firstName}
                              >
                                <i
                                  className="icon-heart"
                                  onClick={(event) =>
                                    this.addInterest(users._id)
                                  }
                                ></i>
                              </span>
                            )}
                            <span
                              title="Send a Message"
                              onClick={(event) => this.viewDetails(users._id)}
                              title="Send a Message"
                            >
                              <i className="icon-message"></i>
                            </span>{" "}
                            <span
                              className="mr-1 camera"
                              title="View Photos"
                              data-toggle="modal"
                              data-target="#myModal"
                              onClick={(event) => {
                                this.loadModal(users);
                              }}
                            >
                              <i className="icon-camera"></i>
                            </span>
                            <div
                              className={
                                users.isOnline
                                  ? "circle online"
                                  : "circle offline"
                              }
                            ></div>
                          </div>
                          <a
                            onClick={(event) =>
                              this.submitHandle(users.memberNumber, users._id)
                            }
                          >
                            <img
                              className="img-fluid img-user"
                              src={
                                users.profileImg
                                  ? SERVERURL + users.profileImg
                                  : imgUrl
                              }
                              alt="image"
                            />
                          </a>
                        </figure>
                        <div className="feature-content">
                          <h4>
                            <a href="#">
                              <i className="icon-user pr-1"></i>
                              {users.firstName
                                ? users.firstName
                                : "User Name"}{" "}
                              {users.lastName ? users.lastName : ""}
                            </a>
                          </h4>
                          <div className="meta-tag">
                            <span>
                              <i className="icon-map-marker"></i>{" "}
                              {users.city ? users.city + ", " : ""}
                              {users.province ? users.province + "," : ""}
                              {users.country ? users.country : ""}
                            </span>
                          </div>
                          <div className="meta-tag">
                            <span>
                              {" "}
                              <i className="icon-address-book"></i>{" "}
                              {users.dob ? users.dob : ""}
                            </span>{" "}
                            {
                              <span className="float-right">
                                <i className="icon-watch"></i>
                                {users.lastActive
                                  ? users.lastActive
                                  : "0 sec "}{" "}
                                Ago{" "}
                              </span>
                            }
                          </div>
                          <br />

                          <div className="listing-bottom text-center">
                            <button
                              type="button"
                              onClick={(event) =>
                                this.submitHandle(users.memberNumber, users._id)
                              }
                              className="btn btn-common"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h5 className="text-center">No Record found!!</h5>
              )}
            </div>
          </div>
          <div className="site-section custom-tabbing-style">
            <div className="container">
              <div className="text-center border-primary">
                <h2 className="font-weight-light text-primary pb-3">
                  Mutual Matches
                </h2>
              </div>
              {mutualRecord.length > 0 ? (
                <div className="row">
                  {mutualRecord.map((users, key) => (
                    <div className="col-md-6 col-lg-4" key={key}>
                      <div className="featured-box mb-4">
                        <figure>
                          <div className="icon">
                            {interestUserId.indexOf(users.userId._id) != -1 ? (
                              <span
                                className="bg-green favorite"
                                title={
                                  "show interest in " + users.userId.firstName
                                }
                              >
                                <i
                                  className="icon-heart"
                                  onClick={(event) =>
                                    this.removeInterest(users.userId._id)
                                  }
                                ></i>
                              </span>
                            ) : (
                              <span
                                className="bg-green"
                                title={
                                  "remove interest in " + users.userId.firstName
                                }
                              >
                                <i
                                  className="icon-heart"
                                  onClick={(event) =>
                                    this.addInterest(users.userId._id)
                                  }
                                ></i>
                              </span>
                            )}
                            <span
                              title="Send a Message"
                              onClick={(event) =>
                                this.viewDetails(users.userId._id)
                              }
                            >
                              <i className="icon-message"></i>
                            </span>{" "}
                            <span
                              className="mr-1 camera"
                              title="View Photos"
                              data-toggle="modal"
                              data-target="#myModal"
                              onClick={(event) => {
                                this.loadModal(users.userId);
                              }}
                            >
                              <i className="icon-camera"></i>
                            </span>
                            <div
                              className={
                                users.userId.isOnline
                                  ? "circle online"
                                  : "circle offline"
                              }
                            ></div>
                          </div>
                          <a
                            onClick={(event) =>
                              this.submitHandle(
                                users.userId.memberNumber,
                                users.userId._id
                              )
                            }
                          >
                            <img
                              className="img-fluid img-user"
                              src={
                                users.userId.profileImg
                                  ? SERVERURL + users.userId.profileImg
                                  : imgUrl
                              }
                              alt="image"
                            />
                          </a>
                        </figure>

                        <div className="feature-content">
                          <h4>
                            <a
                              onClick={(event) =>
                                this.submitHandle(
                                  users.userId.memberNumber,
                                  users.userId._id
                                )
                              }
                            >
                              <i className="icon-user pr-1"></i>
                              {users.userId.firstName
                                ? users.userId.firstName
                                : "User Name"}{" "}
                              {users.userId.lastName
                                ? users.userId.lastName
                                : ""}
                            </a>
                          </h4>
                          <div className="meta-tag">
                            <span>
                              <i className="icon-map-marker"></i>
                              {users.userId.city
                                ? users.userId.city + ", "
                                : ""}
                              {users.userId.province
                                ? users.userId.province + ","
                                : ""}
                              {users.userId.country ? users.userId.country : ""}
                            </span>
                          </div>
                          <div className="meta-tag">
                            <span>
                              {" "}
                              <i className="icon-address-book"></i>{" "}
                              {users.userId.dob ? users.userId.dob : ""}
                            </span>{" "}
                            <span className="float-right">
                              <i className="icon-watch"></i>{" "}
                              {users.userId.lastActive
                                ? users.userId.lastActive
                                : "0 sec "}{" "}
                              Ago{" "}
                            </span>
                          </div>
                          <label>
                            <strong>Seeking : </strong> Female,18yrs-27yrs
                          </label>
                          <br />
                          <label className="pb-3">
                            <strong>Mutual Matches : </strong> 10
                          </label>
                          <div className="listing-bottom text-center">
                            <button
                              type="button"
                              onClick={(event) =>
                                this.submitHandle(users.userId.memberNumber)
                              }
                              className="btn btn-common"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h5 className="text-center">No Record found!!</h5>
              )}
            </div>
          </div>
          <div className="site-section pb-150">
            <div className="container">
              <div className="row">
                <div className="col-12 col-12 text-center border-primary mb-5">
                  <h2 className="font-weight-light text-primary">
                    Advertisement
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-12 block-13">
                  <div className="owl-carousel nonloop-block-13">
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Irfan</a>
                        </h3>
                        <address className="mb-2">Age/Height : 22/5'6</address>
                        <address className="mb-2">
                          Safi, Doukkala-Abda, Morocco
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center text-center">
                        <h3>
                          <a href="#">Aaliya</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'0</address>
                        <address className="mb-2">
                          Kurigram, Rājshāhi, Bangladesh
                        </address>
                        <address className="mb-2">
                          Seeking : Male, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Ashima</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'3</address>
                        <address className="mb-2">
                          El Hajeb, Meknès-Tafilalet, Morocco
                        </address>
                        <address className="mb-2">
                          Seeking : Male, 18yrs-40yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Suhail Khan</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'5</address>
                        <address className="mb-2">
                          Gambetta, Souk Ahras, Algeria
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Aasim Khan</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'0</address>
                        <address className="mb-2">
                          Birmingham,Midlands, Mumbai
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Irag</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'3</address>
                        <address className="mb-2">
                          Zaghouan, Zaghouan, Tunisia
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Ajay</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'0</address>
                        <address className="mb-2">
                          Calicut, Kerala, India
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                    <div className="d-block d-md-flex listing vertical">
                      <a href="#" className="img d-block"></a>
                      <div className="lh-content text-center">
                        <h3>
                          <a href="#">Rahul</a>
                        </h3>
                        <address className="mb-2">Age/Height : 23/5'0</address>
                        <address className="mb-2">
                          Lahore, Punjab, Pakistan
                        </address>
                        <address className="mb-2">
                          Seeking : Female, 18yrs-30yrs
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                id="close"
                data-dismiss="modal"
              >
                &times;
              </button>
              <div className="modal-body">
                <div className="big-photo-holder">
                  <Slider {...settings}>
                    {userDetails.Image1 && userDetails.Image1.length > 0 ? (
                      <img
                        src={SERVERURL + userDetails.Image1[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetails.Image2 && userDetails.Image2.length > 0 ? (
                      <img
                        src={SERVERURL + userDetails.Image2[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetails.Image3 && userDetails.Image3.length > 0 ? (
                      <img
                        src={SERVERURL + userDetails.Image3[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetails.Image4 && userDetails.Image4.length > 0 ? (
                      <img
                        src={SERVERURL + userDetails.Image4[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                  </Slider>
                </div>
                <div className="text-center">
                  <div className="align-item-start">
                    <div className="flex items-center fill-white action-lg-buttons mb1 text-center">
                      {interestUserId.indexOf(otherUserid) != -1 ? (
                        <div
                          className="fav pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                          tooltip="Remove interest"
                          flow="down"
                          onClick={(event) => this.removeInterest(otherUserid)}
                        >
                          <i className="icon-heart"></i>
                        </div>
                      ) : (
                        <div
                          className="pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                          tooltip="Show interest"
                          flow="down"
                        >
                          <i className="icon-heart"></i>
                        </div>
                      )}
                      <div
                        className="pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                        tooltip="Send Angga a message"
                        onClick={(event) => this.viewDetails(otherUserid)}
                        flow="down"
                      >
                        <i className="icon-message"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
