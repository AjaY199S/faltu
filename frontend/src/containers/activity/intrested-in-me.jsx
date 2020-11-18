/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import moment from "moment";
import Loading from "react-fullscreen-loading";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
import base from "../../globals/base";
import {
  ERRORMSG,
  SERVERURL,
  PERPAGE,
  seconds_to_days_hours_mins_secs_str,
} from "../../globals/constant";
import showNotification from "../../services/notificationService"; // to show success notice
import * as UserService from "../../services/userAuthService";
const IMG = base + "assets/images/customer.png";
export default class Intrested extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      interestUserId: [],
      favoriteUserId: [],
      userDetails: "",
      otherUserid: "",
      perPage: PERPAGE,
      page: 1,
      type: 1,
      loading: false,
      count: 0,
    };
  }

  componentWillMount = async () => {
    await UserService.checkLogin()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({
            interestUserId: responseData.data.interestUserId,
            favoriteUserId: responseData.data.favoriteUserId,
          });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
    this.getInteresetInMe();
  };

  getInteresetInMe = async () => {
    let filter = {
      type: this.state.type,
      offest: this.state.page,
      limit: this.state.perPage,
    };
    this.setState({ loading: true });
    await UserService.interestedInMe(filter)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({
            count: responseData.totalCount / this.state.perPage,
          });
          responseData.data.map((data) => {
            if (data.userDetails[0]) {
              delete data.userDetails[0]._id;
              delete data.userDetails[0].userId;
              delete data.userDetails[0].__v;
              delete data.userDetails[0].createdOn;
              delete data.userDetails[0].updatedOn;
            }
            if (
              data.interestUserId.lastActive &&
              data.interestUserId.lastActive != ""
            ) {
              let time =
                (new Date().getTime() -
                  new Date(data.interestUserId.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.interestUserId.lastActive = newTime;
            }
            data.updatedOn = moment(
              parseInt(new Date(data.updatedOn).getTime())
            ).format("LLL");
          });
          this.setState({ record: responseData.data });
        }
        setTimeout(() => {
          this.setState({ loading: false });
        }, 800);
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 800);
        showNotification("danger", ERRORMSG);
      });
  };

  changeType = async (event) => {
    this.setState({ type: await event.target.value });
    this.getInteresetInMe();
  };

  handlePageChange = async (data) => {
    let selected = await data.selected;
    selected = selected + 1;
    this.setState({ page: selected });
    this.getInteresetInMe();
  };

  removeInterest = async (id) => {
    this.setState({ loading: true });
    await UserService.removeInterest(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
          this.setState({ loading: false });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  addInterest = async (id) => {
    this.setState({ loading: true });
    let obj = {
      interestUserId: id,
    };
    await UserService.addInterest(obj)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
          this.setState({ loading: false });
        } else {
          showNotification("danger", responseData.message);
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
      interestUserId,
      favoriteUserId,
      userDetails,
      otherUserid,
      loading,
      perPage,
      count,
    } = this.state;
    return (
      <div>
        <div className="bg-light banner-bottom border-bottom mt-55">
          <div className="container">
            <div className="row form-group m-0 ml-auto">
              <label className="d-flex align-items-center label m-0">
                <strong>Order by</strong>
                <select
                  className="col-md-3 form-control ml-3"
                  onChange={this.changeType}
                >
                  <option value="1">Date</option>
                  <option value="2">Gender</option>
                </select>{" "}
              </label>
            </div>
          </div>
        </div>
        <section className="pt-80 pb-150 msg-detail custom-tabbing-style activity">
          <div className="container" id="interested-in-me">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center border-primary mb-5">
                  <h2 className="font-weight-light text-primary pb-3">
                    Interested in me
                  </h2>
                </div>
                <div className="row">
                  {record && record.length > 0 ? (
                    record.reverse().map((users, key) => (
                      <div className="col-lg-6 mb-4" key={key}>
                        <div className="featured-box card-box p-3 mb-0">
                          <div className="row align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-3 text-center text-md-left border-right">
                              <figure className="mb-0 text-center">
                                <a
                                  onClick={(event) =>
                                    this.submitHandle(
                                      users.interestUserId.memberNumber,
                                      users.interestUserId._id
                                    )
                                  }
                                >
                                  <img
                                    className="img-fluid img-user rounded-circle"
                                    src={
                                      users.interestUserId.profileImg
                                        ? SERVERURL +
                                          users.interestUserId.profileImg
                                        : IMG
                                    }
                                    alt="image"
                                  />
                                </a>
                                <div
                                  className={
                                    users.interestUserId.isOnline
                                      ? "circle online"
                                      : "circle offline"
                                  }
                                ></div>
                              </figure>
                            </div>
                            <div className="col-lg-8 col-md-9">
                              <div className="text">
                                <ul className="pl-0 mb-0">
                                  <li className=" username mt-2">
                                    <strong className="text-body font-weight-semibold">
                                      <i className="icon-user pr-2"></i>{" "}
                                      {users.interestUserId.firstName}{" "}
                                      {users.interestUserId.lastName}
                                    </strong>
                                  </li>
                                  <li className="common mb-2">
                                    <i className="icon-address-book pr-2"></i>
                                    Seeking : 18yrs-40yrs, Male
                                  </li>
                                  <li className="common mb-2">
                                    <i className="icon-map-marker pr-2"></i>
                                    {users.interestUserId.city
                                      ? users.interestUserId.city + ", "
                                      : ""}
                                    {users.interestUserId.province
                                      ? users.interestUserId.province + ","
                                      : ""}
                                    {users.interestUserId.country
                                      ? users.interestUserId.country
                                      : ""}
                                  </li>
                                  <li className="common mb-2">
                                    Last Active :{" "}
                                    {users.interestUserId.lastActive}
                                  </li>

                                  <li className="common mb-2 msg">
                                    Received : {users.updatedOn}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="icon">
                              {interestUserId.indexOf(
                                users.interestUserId._id
                              ) != -1 ? (
                                <span
                                  className="bg-green favorite mr-1"
                                  title="Remove Interest"
                                >
                                  <i
                                    className="icon-heart"
                                    onClick={(event) =>
                                      this.removeInterest(
                                        users.interestUserId._id
                                      )
                                    }
                                  ></i>
                                </span>
                              ) : (
                                <span
                                  className="bg-green unfavorite mr-1"
                                  title="Show Interest"
                                >
                                  <i
                                    className="icon-heart"
                                    onClick={(event) =>
                                      this.addInterest(users.interestUserId._id)
                                    }
                                  ></i>
                                </span>
                              )}
                              <span
                                className="trash"
                                onClick={(event) =>
                                  this.viewDetails(users.interestUserId._id)
                                }
                                title="Send a Message"
                              >
                                <i className="icon-message mr-1"></i>
                              </span>
                              {favoriteUserId.indexOf(
                                users.interestUserId._id
                              ) != -1 ? (
                                <span
                                  className="mr-1 trashes"
                                  title="Remove Favorite"
                                  onClick={(event) =>
                                    this.removeFavorite(
                                      users.interestUserId._id
                                    )
                                  }
                                >
                                  <i className="icon-star"></i>
                                </span>
                              ) : (
                                <span
                                  className="mr-1 trash"
                                  title="Add Favorite"
                                  onClick={(event) =>
                                    this.addFavorite(users.interestUserId._id)
                                  }
                                >
                                  <i className="icon-star"></i>
                                </span>
                              )}
                              <span
                                className="mr-1 camera"
                                title="View Photos"
                                data-toggle="modal"
                                data-target="#myModal"
                                onClick={(event) => {
                                  this.loadModal(users.interestUserId);
                                }}
                              >
                                <i className="icon-camera"></i>
                                {users.userDetails[0]
                                  ? Object.keys(users.userDetails[0]).length
                                  : ""}
                              </span>
                            </div>
                            <div className="ml-auto">
                              <a
                                onClick={(event) =>
                                  this.submitHandle(
                                    users.interestUserId.memberNumber,
                                    users.interestUserId._id
                                  )
                                }
                                className="btn btn-common"
                              >
                                View Details
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-center">No Record found!!</h5>
                  )}
                </div>
                <ul className="pagination pagination-rounded justify-content-end mb-0 p-4">
                  <ReactPaginate
                    previousLabel={"← previous"}
                    nextLabel={"next →"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={count}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={perPage}
                    onPageChange={this.handlePageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"page-link"}
                  />
                </ul>
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
        <Loading loading={loading} background="#999da3" loaderColor="#3498db" />
      </div>
    );
  }
}