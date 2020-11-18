/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Slider from "react-slick";
import moment from "moment";
import "./styles.css";
import base from "../../globals/base";
import { AGE, ERRORMSG, SERVERURL } from "../../globals/constant";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
const IMG = base + "assets/images/customer.png";

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: "",
      imgUrl: "",
      age: "",
      userDetails: "",
      userId: "",
      userDetail: "",
      otherUserid: "",
      interestUserId: [],
    };
  }

  submitHandle = async () => {
    let id = {
      matchId: this.state.record.basicData._id,
    };

    await UserService.matchId(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  Handle = async () => {
    let id = {
      matchId: this.state.record.basicData._id,
    };
    await UserService.unmatchId(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  componentWillMount = async () => {
    await UserService.checkLogin()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({
            userDetails: responseData.data,
            interestUserId: responseData.data.interestUserId,
          });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
    let imgUrl = IMG;
    if (this.props.location.state && this.props.location.state.record) {
      await UserService.MemberNumber(this.props.location.state.record)
        .then(async (response) => {
          let responseDatas = response.data;
          this.setState({ userId: responseDatas.data.basicData._id });
          if (responseDatas.success) {
            if (responseDatas.data.mediaData) {
              delete responseDatas.data.mediaData.createdOn;
              delete responseDatas.data.mediaData.updatedOn;
              delete responseDatas.data.mediaData._id;
              delete responseDatas.data.mediaData.userId;
              delete responseDatas.data.mediaData.__v;
            }
            await this.setState(
              { record: responseDatas.data, imgUrl: imgUrl },
              () => {
                if (
                  this.state.record.basicData &&
                  this.state.record.basicData.dob
                ) {
                  var dob = this.state.record.basicData.dob;

                  var years = moment().diff(dob, "years", false);
                  this.setState({ age: years });
                }
              }
            );
          }
        })
        .catch((err) => {});
    }
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

  addFavorite = async (id) => {
    let obj = {
      favoriteUserId: id,
    };
    await UserService.addFavorite(obj)
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

  removeFavorite = async (id) => {
    await UserService.removeFavorite(id)
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

  blockUser = async (id) => {
    let obj = {
      blockUserId: id,
    };
    await UserService.blockUser(obj)
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

  unblockUser = async (id) => {
    await UserService.unblockUser(id)
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

  addReport = async (id) => {
    await UserService.addReport({ reportedUserId: id })
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

  removeReport = async (id) => {
    await UserService.removeReport(id)
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
        this.setState({ userDetail: newObj });
      })
      .catch((err) => {
        throw err;
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
      age,
      userDetails,
      userId,
      userDetail,
      otherUserid,
      interestUserId,
    } = this.state;
    return (
      <div>
        <section className="main-container contact-us pt-150 pb-150 custom-tabbing-style user-detail">
          <div className="container mb-lg-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="tab-content single-image p-3">
                  {record.mediaData ? (
                    record.mediaData.Image1 ? (
                      record.mediaData.Image1.length > 0 ? (
                        <div
                          id="home"
                          className="container tab-pane active p-0"
                        >
                          <img
                            className="img-fluid"
                            title="View Photos"
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={(event) => {
                              this.loadModal(record.basicData);
                            }}
                            src={
                              record.mediaData.Image1[0].path
                                ? SERVERURL + record.mediaData.Image1[0].path
                                : imgUrl
                            }
                            alt="image"
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {record.mediaData ? (
                    record.mediaData.Image2 ? (
                      record.mediaData.Image2.length > 0 ? (
                        <div id="menu1" className="container tab-pane fade p-0">
                          <img
                            className="img-fluid"
                            title="View Photos"
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={(event) => {
                              this.loadModal(record.basicData);
                            }}
                            src={
                              record.mediaData.Image2[0].path
                                ? SERVERURL + record.mediaData.Image2[0].path
                                : imgUrl
                            }
                            alt="image"
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {record.mediaData ? (
                    record.mediaData.Image3 ? (
                      record.mediaData.Image3.length > 0 ? (
                        <div id="menu2" className="container tab-pane fade p-0">
                          <img
                            className="img-fluid"
                            title="View Photos"
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={(event) => {
                              this.loadModal(record.basicData);
                            }}
                            src={
                              record.mediaData.Image3[0].path
                                ? SERVERURL + record.mediaData.Image3[0].path
                                : imgUrl
                            }
                            alt="image"
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {record.mediaData ? (
                    record.mediaData.Image4 ? (
                      record.mediaData.Image4.length > 0 ? (
                        <div id="menu3" className="container tab-pane fade p-0">
                          <img
                            className="img-fluid"
                            title="View Photos"
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={(event) => {
                              this.loadModal(record.basicData);
                            }}
                            src={
                              record.mediaData.Image4[0].path
                                ? SERVERURL + record.mediaData.Image4[0].path
                                : imgUrl
                            }
                            alt="image"
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <ul className="nav nav-tabs user-images pt-5" role="tablist">
                    {record.mediaData ? (
                      record.mediaData.Image1 ? (
                        record.mediaData.Image1.length > 0 ? (
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#home"
                            >
                              <img
                                className="img-fluid"
                                src={
                                  record.mediaData.Image1[0].path
                                    ? SERVERURL +
                                      record.mediaData.Image1[0].path
                                    : imgUrl
                                }
                                alt="image"
                              />
                            </a>
                          </li>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {record.mediaData ? (
                      record.mediaData.Image2 ? (
                        record.mediaData.Image2.length > 0 ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#menu1"
                            >
                              <img
                                className="img-fluid"
                                src={
                                  record.mediaData.Image2[0].path
                                    ? SERVERURL +
                                      record.mediaData.Image2[0].path
                                    : imgUrl
                                }
                                alt="image"
                              />
                            </a>
                          </li>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {record.mediaData ? (
                      record.mediaData.Image3 ? (
                        record.mediaData.Image3.length > 0 ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#menu2"
                            >
                              <img
                                className="img-fluid"
                                src={
                                  record.mediaData.Image3[0].path
                                    ? SERVERURL +
                                      record.mediaData.Image3[0].path
                                    : imgUrl
                                }
                                alt="image"
                              />
                            </a>
                          </li>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {record.mediaData ? (
                      record.mediaData.Image4 ? (
                        record.mediaData.Image4.length > 0 ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#menu2"
                            >
                              <img
                                className="img-fluid"
                                src={
                                  record.mediaData.Image4[0].path
                                    ? SERVERURL +
                                      record.mediaData.Image4[0].path
                                    : imgUrl
                                }
                                alt="image"
                              />
                            </a>
                          </li>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="tab-content text-left">
                  <div>
                    <div className="row relative mb2">
                      <div className="col-md-9">
                        <div className="profile-text ps1">
                          <h4 className="text-color">
                            {record.basicData
                              ? record.basicData.firstName
                                ? record.basicData.firstName + " "
                                : ""
                              : ""}

                            {record.basicData
                              ? record.basicData.lastName
                                ? record.basicData.lastName + " "
                                : ""
                              : ""}
                          </h4>
                          <ul className="pl-0 detail-items">
                            <li>
                              {record.basicData
                                ? record.basicData.dob
                                  ? age
                                  : ""
                                : ""}{" "}
                              {record.basicData
                                ? record.basicData.city
                                  ? record.basicData.city + ", "
                                  : ""
                                : ""}
                              {record.basicData
                                ? record.basicData.province
                                  ? record.basicData.province + ", "
                                  : ""
                                : ""}{" "}
                              {record.basicData
                                ? record.basicData.country
                                  ? record.basicData.country
                                  : ""
                                : ""}
                            </li>
                            <li>
                              {record.basicData
                                ? record.basicData.gender
                                  ? record.basicData.gender + " /"
                                  : ""
                                : ""}
                              {record.lifestyleData
                                ? record.lifestyleData.maritalStatus
                                  ? record.lifestyleData.maritalStatus + " /"
                                  : ""
                                : ""}

                              {record.basicData
                                ? record.basicData.memberNumber
                                  ? "ID:" + record.basicData.memberNumber
                                  : ""
                                : ""}
                            </li>
                            <li>
                              Seeking Male 30 - 40 living in Canada For:
                              Marriage
                            </li>
                            <li>Last active: 2 hours ago</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="align-item-start">
                          <div className="flex items-center fill-white action-lg-buttons mb1 text-center">
                            {userDetails.interestUserId &&
                            userDetails.interestUserId.indexOf(userId) != -1 ? (
                              <div
                                className="fav pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                                tooltip="Remove interest"
                                flow="down"
                                onClick={(event) => this.removeInterest(userId)}
                              >
                                <i className="icon-heart"></i>
                              </div>
                            ) : (
                              <div
                                className="pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                                tooltip="Show interest"
                                flow="down"
                                onClick={(event) => this.addInterest(userId)}
                              >
                                <i className="icon-heart"></i>
                              </div>
                            )}
                            <div
                              className="pointer circle icon-padding shadow relative bg-dark-grey bg-action-highlight"
                              tooltip="Send Angga a message"
                              flow="down"
                              onClick={(event) => this.viewDetails(userId)}
                            >
                              <i className="icon-message"></i>
                            </div>
                          </div>
                        </div>
                        <div className="action-buttons">
                          <div className="align-item-end bottomdata">
                            <div className="flex items-center">
                              <a className="me1">
                                {userDetails.favoriteUserId &&
                                userDetails.favoriteUserId.indexOf(userId) !=
                                  -1 ? (
                                  <div
                                    className="fav pointer circle relative me1 fill-action-unhighlight"
                                    tooltip="Remove User from your favorites"
                                    flow="up"
                                    onClick={(event) =>
                                      this.removeFavorite(userId)
                                    }
                                  >
                                    <i className="icon-star"></i>
                                  </div>
                                ) : (
                                  <div
                                    className="pointer circle relative me1 fill-action-unhighlight"
                                    tooltip="Add User to your favorites"
                                    flow="up"
                                    onClick={(event) =>
                                      this.addFavorite(userId)
                                    }
                                  >
                                    <i className="icon-star"></i>
                                  </div>
                                )}
                              </a>

                              <a href="#" className="me1">
                                {userDetails.reportedUserId &&
                                userDetails.reportedUserId.indexOf(userId) !=
                                  -1 ? (
                                  <div
                                    className="report border-none p0 h4 body-font-color bg-transparent relative pointer"
                                    tooltip="Remove Report Abuse"
                                    flow="up"
                                  >
                                    <i
                                      className="icon-exclamation"
                                      aria-hidden="true"
                                      onClick={(event) =>
                                        this.removeReport(userId)
                                      }
                                    ></i>
                                  </div>
                                ) : (
                                  <div
                                    className="border-none p0 h4 body-font-color bg-transparent relative pointer"
                                    tooltip="Report Abuse"
                                    flow="up"
                                  >
                                    <i
                                      className="icon-exclamation"
                                      aria-hidden="true"
                                      onClick={(event) =>
                                        this.addReport(userId)
                                      }
                                    ></i>
                                  </div>
                                )}
                              </a>

                              <a className="me1">
                                {userDetails.blockUserId &&
                                userDetails.blockUserId.indexOf(userId) !=
                                  -1 ? (
                                  <div
                                    className="fav block p0 h4 body-font-color border-none bg-transparent relative pointer flex justify-start"
                                    tooltip="UnBlock User"
                                    flow="up"
                                    onClick={(event) =>
                                      this.unblockUser(userId)
                                    }
                                  >
                                    <i
                                      className="icon-block"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                ) : (
                                  <div
                                    className="block p0 h4 body-font-color border-none bg-transparent relative pointer flex justify-start"
                                    tooltip="Block User"
                                    flow="up"
                                    onClick={(event) => this.blockUser(userId)}
                                  >
                                    <i
                                      className="icon-block"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table
                        className="table table-centered table-striped text-left"
                        id="products-datatable"
                      >
                        <thead>
                          <tr>
                            <th>
                              Overview <i className="icon-pencil pl-3"></i>
                            </th>
                            <th>Fatuma</th>
                            <th>
                              {record.basicData
                                ? record.basicData.gender
                                  ? record.basicData.gender === "Male"
                                    ? "He's"
                                    : record.basicData.gender === "Female"
                                    ? "She's"
                                    : ""
                                  : ""
                                : ""}{" "}
                              Looking For
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Education</td>
                            <td>
                              {record.basicData
                                ? record.basicData.gender
                                  ? record.basicData.gender
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                          <tr>
                            <td>Have children</td>
                            <td>
                              {record.lifestyleData
                                ? record.lifestyleData.doYouHaveChildren
                                  ? record.lifestyleData.doYouHaveChildren
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                          <tr>
                            <td>Drink</td>
                            <td>
                              {record.lifestyleData
                                ? record.lifestyleData.doYouDrink
                                  ? record.lifestyleData.doYouDrink
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                          <tr>
                            <td>Smoke</td>
                            <td>
                              {record.lifestyleData
                                ? record.lifestyleData.doYouSmoke
                                  ? record.lifestyleData.doYouSmoke
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                          <tr>
                            <td>Religion</td>
                            <td>
                              {record.religiousBackgroundData
                                ? record.religiousBackgroundData.religion
                                  ? record.religiousBackgroundData.religion
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                          <tr>
                            <td>Occupation</td>
                            <td>
                              {record.lifestyleData
                                ? record.lifestyleData.occupation
                                  ? record.lifestyleData.occupation
                                  : "No Answer"
                                : "No Answer"}
                            </td>
                            <td>Any</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="radio-label">
                          Match{" "}
                          <input
                            type="radio"
                            name="radio"
                            onClick={this.submitHandle}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="radio-label">
                          No Match{" "}
                          <input
                            type="radio"
                            name="radio"
                            onClick={this.Handle}
                          />{" "}
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="tab-content">
                    <div>
                      <div className="text-left border-primary mb-3">
                        <h4 className="font-weight-light text-primary pb-2">
                          Member Overview
                        </h4>
                      </div>
                      <ul>
                        <li>
                          {record.ownWordsData
                            ? record.ownWordsData.aboutYourself
                              ? record.ownWordsData.aboutYourself
                              : "No Answer"
                            : "No Answer"}
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div>
                      <div className="text-left border-primary mb-3">
                        <h4 className="font-weight-light text-primary pb-2">
                          Seeking
                        </h4>
                      </div>
                      <ul>
                        <li>
                          {record.ownWordsData
                            ? record.ownWordsData.lookingForInPartner
                              ? record.ownWordsData.lookingForInPartner
                              : "No Answer"
                            : "No Answer"}
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div>
                      <div className="text-left border-primary mb-3">
                        <h4 className="font-weight-light text-primary pb-2">
                          More About Me
                        </h4>
                      </div>
                      <h5 className="mb-4">Basic</h5>
                      <div className="table-responsive">
                        <table
                          className="table table-centered table-striped text-left"
                          id="products-datatable"
                        >
                          <thead>
                            <tr>
                              <th></th>
                              <th>
                                {" "}
                                {record.basicData
                                  ? record.basicData.firstName
                                    ? record.basicData.firstName + " "
                                    : ""
                                  : ""}
                              </th>
                              <th>
                                {record.basicData
                                  ? record.basicData.gender
                                    ? record.basicData.gender === "Male"
                                      ? "He's"
                                      : record.basicData.gender === "Female"
                                      ? "She's"
                                      : ""
                                    : ""
                                  : ""}{" "}
                                Looking For
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Gender</td>
                              <td>
                                {record.basicData
                                  ? record.basicData.gender
                                    ? record.basicData.gender
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Male</td>
                            </tr>
                            <tr>
                              <td>Age</td>
                              <td>
                                {record.basicData
                                  ? record.basicData.dob
                                    ? age
                                    : "No Answer"
                                  : "No Answer"}{" "}
                              </td>
                              <td>30 - 40</td>
                            </tr>
                            <tr>
                              <td>Lives in</td>
                              <td>
                                {record.basicData
                                  ? record.basicData.city
                                    ? record.basicData.city + ", "
                                    : ""
                                  : ""}
                                {record.basicData
                                  ? record.basicData.province
                                    ? record.basicData.province + ", "
                                    : ""
                                  : ""}{" "}
                                {record.basicData
                                  ? record.basicData.country
                                    ? record.basicData.country
                                    : ""
                                  : ""}
                              </td>
                              <td>Canada</td>
                            </tr>
                            <tr>
                              <td>Relocate</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.willingToRelocate
                                    ? record.lifestyleData.willingToRelocate
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Religion</td>
                              <td>
                                {" "}
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.religion
                                    ? record.religiousBackgroundData.religion
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Occupation</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.occupation
                                    ? record.lifestyleData.occupation
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="my-4 text-color">Appearance</h5>
                      <div className="table-responsive">
                        <table
                          className="table table-centered table-striped text-left"
                          id="products-datatable"
                        >
                          <tbody>
                            <tr>
                              <td>Hair Color</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.hairColor
                                    ? record.appearanceData.hairColor
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Hair length</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.hairLength
                                    ? record.appearanceData.hairLength
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Hair type</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.hairType
                                    ? record.appearanceData.hairType
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Eye color</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.eyeColor
                                    ? record.appearanceData.eyeColor
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Eye wear</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.eyeWear
                                    ? record.appearanceData.eyeWear
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Height</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.height
                                    ? record.appearanceData.height
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Weight</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.weight
                                    ? record.appearanceData.weight
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Body style</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.bodyType
                                    ? record.appearanceData.bodyType
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Ethnicity</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.ethnicity
                                    ? record.appearanceData.ethnicity
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Complexion</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.complexion
                                    ? record.appearanceData.complexion
                                    : "No Answer"
                                  : "No Answer"}
                                }
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Facial hair</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.facialHair
                                    ? record.appearanceData.facialHair
                                    : "No Answer"
                                  : "No Answer"}
                                }
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Appearance</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData.considerMyselfAs
                                    ? record.appearanceData.considerMyselfAs
                                    : "No Answer"
                                  : "No Answer"}
                                }
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Physical / Health status</td>
                              <td>
                                {record.appearanceData
                                  ? record.appearanceData
                                      .physicalAndHealthStatus
                                    ? record.appearanceData
                                        .physicalAndHealthStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="my-4 text-color">Lifestyle</h5>
                      <div className="table-responsive">
                        <table
                          className="table table-centered table-striped text-left"
                          id="products-datatable"
                        >
                          <tbody>
                            <tr>
                              <td>Drink</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.doYouDrink
                                    ? record.lifestyleData.doYouDrink
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Smoke</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.doYouSmoke
                                    ? record.lifestyleData.doYouSmoke
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Eating habits</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.eatingHabits
                                    ? record.lifestyleData.eatingHabits
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Marital Status</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.maritalStatus
                                    ? record.lifestyleData.maritalStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Have children</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.doYouHaveChildren
                                    ? record.lifestyleData.doYouHaveChildren
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Number of children</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.numberOfChildren
                                    ? record.lifestyleData.numberOfChildren
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Oldest child</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.oldestChild
                                    ? record.lifestyleData.oldestChild
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Youngest child</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.youngestChild
                                    ? record.lifestyleData.youngestChild
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Want (more) children</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.wantMoreChild
                                    ? record.lifestyleData.wantMoreChild
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Occupation</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.occupation
                                    ? record.lifestyleData.occupation
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Employment status</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.employmentStatus
                                    ? record.lifestyleData.employmentStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Income</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.annualIncome
                                    ? record.lifestyleData.annualIncome
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Home type</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.homeType
                                    ? record.lifestyleData.homeType
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Living situation</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.livingSituation
                                    ? record.lifestyleData.livingSituation
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Residency status</td>
                              <td>
                                {record.lifestyleData
                                  ? record.lifestyleData.residencyStatus
                                    ? record.lifestyleData.residencyStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="my-4 text-color">
                        Background / Cultural Values
                      </h5>
                      <div className="table-responsive">
                        <table
                          className="table table-centered table-striped text-left"
                          id="products-datatable"
                        >
                          <tbody>
                            <tr>
                              <td>Nationality</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.nationality
                                    ? record.religiousBackgroundData.nationality
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Education</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.education
                                    ? record.religiousBackgroundData.education
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Languages spoken</td>
                              {/* <td>
                              {record.religiousBackgroundData.languagesSpoken
                                ? record.religiousBackgroundData.languagesSpoken
                                : "No Answer"}
                            </td> */}
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Religion</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.religion
                                    ? record.religiousBackgroundData.religion
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Born / Reverted</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.bornReverted
                                    ? record.religiousBackgroundData
                                        .bornReverted
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Religious values</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData
                                      .religiousValues
                                    ? record.religiousBackgroundData
                                        .religiousValues
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Attend religious services</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData
                                      .attendReligiousServices
                                    ? record.religiousBackgroundData
                                        .attendReligiousServices
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>N/A</td>
                            </tr>
                            <tr>
                              <td>Wear a Niqab</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData
                                      .residencyStatus
                                    ? record.religiousBackgroundData
                                        .residencyStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>N/A</td>
                            </tr>
                            <tr>
                              <td>Wear a Hijab</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData
                                      .residencyStatus
                                    ? record.religiousBackgroundData
                                        .residencyStatus
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>N/A</td>
                            </tr>
                            <tr>
                              <td>Read Qur'an</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.readQuran
                                    ? record.religiousBackgroundData.readQuran
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Polygamy</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.polygamy
                                    ? record.religiousBackgroundData.polygamy
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                            <tr>
                              <td>Family values</td>
                              <td>
                                {record.religiousBackgroundData
                                  ? record.religiousBackgroundData.familyValues
                                    ? record.religiousBackgroundData
                                        .familyValues
                                    : "No Answer"
                                  : "No Answer"}
                              </td>
                              <td>Any</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="mb-4 text-color">Hobbies & Interests</h5>
                      <div className="table-responsive">
                        <table
                          className="table table-centered table-striped text-left"
                          id="products-datatable"
                        >
                          <thead>
                            <tr>
                              <th>Entertainment</th>
                              <th>Music</th>
                              <th>Sport</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Art / Painting</td>
                              <td>Religious</td>
                              <td>Tennis / Badminton</td>
                            </tr>
                            <tr>
                              <td>Art</td>
                              <td>English</td>
                              <td>Badminton</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                    <div className="about-me">
                      <h5 className="mb-4 text-color">More About Me</h5>
                      <p></p>
                      <ul className="pl-0">
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Favorite Movie :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.favouriteMovie
                              ? record.personalityProfileData.favouriteMovie
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Favorite Book :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.favouriteBooks
                              ? record.personalityProfileData.favouriteBooks
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Favorite Food :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.foodLike
                              ? record.personalityProfileData.foodLike
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Favorite Music :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.musicLike
                              ? record.personalityProfileData.musicLike
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Dress Style :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.dressCode
                              ? record.personalityProfileData.dressCode
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Humor :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.senseOfHumor
                              ? record.personalityProfileData.senseOfHumor
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Hobbies & Interests :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.hobbiesInterest
                              ? record.personalityProfileData.hobbiesInterest
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Travelled :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.travelled
                              ? record.personalityProfileData.travelled
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Cultural Adaption :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.adaptive
                              ? record.personalityProfileData.adaptive
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Romance :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData
                                .perfectRomanticWeekend
                              ? record.personalityProfileData
                                  .perfectRomanticWeekend
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            Personality :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.personality
                              ? record.personalityProfileData.personality
                              : "No Answer"
                            : "No Answer"}
                        </li>
                        <hr />
                        <li>
                          <strong>
                            <i className="icon-hand-o-right pr-2 text-color"></i>
                            My Perfect Match is :{" "}
                          </strong>{" "}
                          {record.personalityProfileData
                            ? record.personalityProfileData.perfectMatch
                              ? record.personalityProfileData.perfectMatch
                              : "No Answer"
                            : "No Answer"}
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div>
                      <h5 className="mb-4 text-color">
                        Safety Tip - If you really love me you'll send me the
                        money
                      </h5>
                      <p>
                        Report anyone who asks you for money by clicking the
                        "Report Abuse" icon. Never send money to anyone who you
                        meet online.
                      </p>
                      <div className="text-center">
                        <a href="#" className="btn btn-common my-3">
                          For more safety tips click here
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white mt-5">
                    <div className="site-section py-5">
                      <div className="container">
                        <div className="row">
                          <div className="col-12 col-12 text-center border-primary mb-5">
                            <h2 className="font-weight-light text-primary">
                              Similar Members
                            </h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 block-13">
                            <div className="owl-carousel nonloop-block-13">
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-1.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Irfan</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 22/5'6
                                  </address>
                                  <address className="mb-2">
                                    Safi, Doukkala-Abda, Morocco
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Female, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-2.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center text-center">
                                  <h3>
                                    <a href="#">Aaliya</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'0
                                  </address>
                                  <address className="mb-2">
                                    Kurigram, Rājshāhi, Bangladesh
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Male, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-3.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Ashima</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'3
                                  </address>
                                  <address className="mb-2">
                                    El Hajeb, Meknès-Tafilalet, Morocco
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Male, 18yrs-40yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-4.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Suhail Khan</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'5
                                  </address>
                                  <address className="mb-2">
                                    Gambetta, Souk Ahras, Algeria
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Female, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-5.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Aasim Khan</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'0
                                  </address>
                                  <address className="mb-2">
                                    Birmingham,Midlands, Mumbai
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Female, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-6.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Irag</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'3
                                  </address>
                                  <address className="mb-2">
                                    Zaghouan, Zaghouan, Tunisia
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Female, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-7.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Ajay</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'0
                                  </address>
                                  <address className="mb-2">
                                    Calicut, Kerala, India
                                  </address>
                                  <address className="mb-2">
                                    Seeking : Female, 18yrs-30yrs
                                  </address>
                                </div>
                              </div>
                              <div className="d-block d-md-flex listing vertical">
                                <a
                                  href="#"
                                  className="img d-block"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      base +
                                      "assets/images/featured-profile-8.jpg" +
                                      ")",
                                  }}
                                ></a>
                                <div className="lh-content text-center">
                                  <h3>
                                    <a href="#">Rahul</a>
                                  </h3>
                                  <address className="mb-2">
                                    Age/Height : 23/5'0
                                  </address>
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
                    {userDetail.Image1 && userDetail.Image1.length > 0 ? (
                      <img
                        src={SERVERURL + userDetail.Image1[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetail.Image2 && userDetail.Image2.length > 0 ? (
                      <img
                        src={SERVERURL + userDetail.Image2[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetail.Image3 && userDetail.Image3.length > 0 ? (
                      <img
                        src={SERVERURL + userDetail.Image3[0].path}
                        alt="user image"
                      />
                    ) : (
                      ""
                    )}
                    {userDetail.Image4 && userDetail.Image4.length > 0 ? (
                      <img
                        src={SERVERURL + userDetail.Image4[0].path}
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
                        onClick={(event) => this.viewDetails(userId)}
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
