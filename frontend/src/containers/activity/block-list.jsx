/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Loading from "react-fullscreen-loading";
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
export default class BlockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      interestUserId: [],
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
          this.setState({ interestUserId: responseData.data.interestUserId });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
    this.blockedList();
  };

  blockedList = async () => {
    let filter = {
      type: this.state.type,
      offest: this.state.page,
      limit: this.state.perPage,
    };
    this.setState({ loading: true });
    await UserService.blockedUser(filter)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          responseData.data.map((data) => {
            this.setState({
              count: responseData.totalCount / this.state.perPage,
            });
            if (data.userDetails[0]) {
              delete data.userDetails[0]._id;
              delete data.userDetails[0].userId;
              delete data.userDetails[0].__v;
              delete data.userDetails[0].createdOn;
              delete data.userDetails[0].updatedOn;
            }
            if (data.blockUserId.dob && data.blockUserId.dob != "") {
              let today = new Date(data.blockUserId.dob);
              let date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.blockUserId.dob = date;
            }
            if (
              data.blockUserId.lastActive &&
              data.blockUserId.lastActive != ""
            ) {
              let time =
                (new Date().getTime() -
                  new Date(data.blockUserId.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.blockUserId.lastActive = newTime;
            }
          });
          this.setState({ record: responseData.data });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
        showNotification("danger", ERRORMSG);
      });
  };

  changeType = async (event) => {
    this.setState({ type: await event.target.value });
    this.blockedList();
  };

  handlePageChange = async (data) => {
    let selected = await data.selected;
    selected = selected + 1;
    this.setState({ page: selected });
    this.blockedList();
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

  render() {
    const { record, interestUserId, loading, perPage, count } = this.state;
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
        <section
          className="pt-80 pb-150 msg-detail custom-tabbing-style discover-matches"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container" id="interested-in-me">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center border-primary mb-5">
                  <h2 className="font-weight-light text-primary pb-3">
                    Block List
                  </h2>
                </div>
                <div className="row">
                  {record && record.length > 0 ? (
                    record.map((users, key) => (
                      <div className="col-md-6 col-lg-4" key={key}>
                        <div className="featured-box mb-4">
                          <figure>
                            <a
                              onClick={(event) =>
                                this.submitHandle(
                                  users.blockUserId.memberNumber,
                                  users.blockUserId._id
                                )
                              }
                            >
                              <img
                                className="img-fluid img-user"
                                src={
                                  users.blockUserId.profileImg
                                    ? SERVERURL + users.blockUserId.profileImg
                                    : IMG
                                }
                                alt="image"
                              />
                            </a>
                          </figure>

                          <div className="feature-content">
                            <h4>
                              <a href="#">
                                <i className="icon-user pr-1"></i>
                                {users.blockUserId.firstName}{" "}
                                {users.blockUserId.lastName}
                              </a>
                            </h4>
                            <div className="meta-tag">
                              <span>
                                <i className="icon-map-marker"></i>{" "}
                                {users.blockUserId.city
                                  ? users.blockUserId.city + ", "
                                  : ""}
                                {users.blockUserId.province
                                  ? users.blockUserId.province + ","
                                  : ""}
                                {users.blockUserId.country
                                  ? users.blockUserId.country
                                  : ""}
                              </span>
                            </div>
                            <div className="meta-tag">
                              <span>
                                {" "}
                                <i className="icon-address-book"></i>{" "}
                                {users.blockUserId.dob
                                  ? users.blockUserId.dob
                                  : ""}
                              </span>
                            </div>
                            <label>
                              <strong>Seeking : </strong> Female,18yrs-27yrs
                            </label>

                            <div className="listing-bottom text-center">
                              <a
                                onClick={(event) =>
                                  this.unblockUser(users.blockUserId._id)
                                }
                                className="btn btn-common"
                              >
                                <i className="icon-block"></i> &nbsp;Unblock
                                User
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
        <Loading loading={loading} background="#999da3" loaderColor="#3498db" />
      </div>
    );
  }
}
