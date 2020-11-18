/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import Slider from "react-slick";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG, SERVERURL } from "../../globals/constant";
import base from "../../globals/base";
const IMG = base + "assets/images/customer.png";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      imgUrl: "",
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
    let imgUrl = IMG;
    if (this.props.location.state && this.props.location.state.record.length) {
      this.setState({
        record: this.props.location.state.record,
        imgUrl: imgUrl,
      });
    }
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
      interestUserId,
      otherUserid,
      userDetails,
    } = this.state;
    return (
      <div>
        <section
          className="discover-matches"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="site-section">
            <div className="container">
              <div className="text-center border-primary">
                <h2 className="font-weight-light text-primary pb-3">Results</h2>
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
                            >
                              <i className="icon-message"></i>
                            </span>
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
                            <div className="online"></div>
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
                            <a
                              onClick={(event) =>
                                this.submitHandle(users.memberNumber, users._id)
                              }
                              className="result-username"
                            >
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
