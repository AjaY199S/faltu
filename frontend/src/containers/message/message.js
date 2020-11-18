/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import {
  ERRORMSG,
  SERVERURL,
  PERPAGE,
  DIFFYRS,
  DELETE,
  DATANOTFOUND,
} from "../../globals/constant";
import ReactPaginate from "react-paginate";
import base from "../../globals/base";
const IMG = base + "assets/images/customer.png";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: PERPAGE,
      userList: [],
      count: 0,
      ownId: "",
      interestUserId: [],
    };
  }

  componentWillMount = async () => {
    this.chatMemberLists();
    await UserService.checkLogin().then(async (response) => {
      if (response && response.data.success) {
        this.setState({
          ownId: response.data.data._id,
          interestUserId: response.data.data.interestUserId,
        });
      }
    });
  };

  chatMemberLists = (body) => {
    let self = this;
    body = body ? body : 1;
    UserService.userLists(self.state.perPage, body)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          responseData.data.users.map((data) => {
            if (data.dob && data.dob != "") {
              let d1 = new Date(data.dob);
              data.dob = DIFFYRS(d1);
            }
            if (data.role) {
              let role = JSON.parse(data.role);
              role.date = moment(parseInt(role.timeStamp)).format("L");
              role.time = moment(parseInt(role.timeStamp)).format("hh:mm a");
              data.role = role;
            }
          });
          responseData.data.users.sort(function (x, y) {
            if (x.role == "") {
              x.role = { timeStamp: 0 };
            }
            if (y.role == "") {
              y.role = { timeStamp: 0 };
            }
            return x.role.timeStamp - y.role.timeStamp;
          });

          self.setState({ userList: responseData.data.users.reverse() });
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.chatMemberLists(selected);
  };

  viewDetails = (data) => {
    this.props.history.push({
      pathname: "/message-detail",
      state: {
        record: data,
      },
    });
  };

  deleteChat = (id) => {
    if (id) {
      confirmAlert({
        title: "Confirm",
        message: DELETE,
        buttons: [
          {
            label: "Yes",
            onClick: () => this.deleteChat(id),
          },
          {
            label: "No",
          },
        ],
      });
    } else {
      showNotification("danger", DATANOTFOUND);
    }
  };
  confirmDelete = async (id) => {
    if (id) {
      await UserService.deleteChat(id)
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
    } else {
      showNotification("danger", ERRORMSG);
    }
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

  render() {
    const { perPage, userList, count, ownId, interestUserId } = this.state;
    return (
      <div>
        <div className="bg-light banner-bottom pt-5 pb-3">
          <div className="container">
            <div className="row ">
              <div class="col-md-6">
                <div class="form-group m-0 mr-auto">
                  <label className="d-flex align-items-center label m-0 flex-strt">
                    <strong>Order by</strong>
                    <select className="col-md-3 form-control ml-3">
                      <option>Date</option>
                      <option>Gender</option>
                    </select>{" "}
                  </label>
                </div>
              </div>
              <div class="col-md-6 text-right">
                <div class="form-group m-0 ml-auto">
                  <label className="d-flex align-items-center label m-0">
                    <strong>Order by</strong>
                    <select className="col-md-3 form-control ml-3">
                      <option>Date</option>
                      <option>Gender</option>
                    </select>{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className="custom-tabbing-style"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="site-section pb-150">
            <div className="messages">
              <div className="content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card-box p-0 border-top mb-0">
                        <div className="table-responsive">
                          {userList.length > 0 ? (
                            <table className="table table-centered table-hover m-0 msg-table">
                              <thead>
                                <tr className="table-heading">
                                  <th>User Details</th>
                                  <th>Date</th>
                                  <th>Message</th>
                                  <th></th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userList.map((users) => (
                                  <tr key={users._id}>
                                    <td className="table-user">
                                      <div className="d-flex align-items-center">
                                        <div className="image pr-2">
                                          <img
                                            src={
                                              users.profileImg
                                                ? SERVERURL + users.profileImg
                                                : IMG
                                            }
                                            alt="table-user"
                                            className="mr-2 rounded-circle"
                                          />
                                          <div
                                            className={
                                              users.isOnline
                                                ? "circle online"
                                                : "circle offline"
                                            }
                                          ></div>
                                          <p className="mb-0 mt-1 text-center">
                                            {users.isOnline
                                              ? "Online"
                                              : "Offline"}
                                          </p>
                                        </div>
                                        <div className="text">
                                          <ul className="pl-3 mb-0">
                                            <li className="mb-1">
                                              <span className="text-body font-weight-semibold">
                                                {" "}
                                                <i className="icon-user pr-2"></i>
                                                {users.firstName}{" "}
                                                {users.lastName}
                                              </span>
                                            </li>
                                            <li className="common mb-1">
                                              <i className="icon-address-book pr-2"></i>
                                              {users.dob
                                                ? users.dob + "years,"
                                                : ""}{" "}
                                              {users.gender
                                                ? users.gender
                                                : "NA"}
                                            </li>
                                            <li className="common mb-1	">
                                              <i className="icon-map-marker pr-2"></i>
                                              {users.city
                                                ? users.city + ","
                                                : ""}{" "}
                                              {users.province
                                                ? users.province + ","
                                                : ""}{" "}
                                              {users.country
                                                ? users.country
                                                : ""}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="icon-calendar pr-2"></i>
                                      {users.role
                                        ? users.role.date
                                          ? users.role.date
                                          : ""
                                        : ""}
                                      <br />{" "}
                                      <i className="icon icon-watch"> </i>
                                      {users.role
                                        ? users.role.time
                                          ? users.role.time
                                          : ""
                                        : ""}
                                    </td>
                                    <td className="msg">
                                      <i className="icon-message pr-2">
                                        {users.role
                                          ? users.role.receiverId
                                            ? users.role.receiverId == ownId
                                              ? users.role.reciverMsgCount > 0
                                                ? users.role.reciverMsgCount
                                                : ""
                                              : ""
                                            : ""
                                          : ""}
                                        {users.role
                                          ? users.role.receiverId
                                            ? users.role.senderId == ownId
                                              ? users.role.senderMsgCount > 0
                                                ? users.role.senderMsgCount
                                                : ""
                                              : ""
                                            : ""
                                          : ""}
                                      </i>
                                      {users.role
                                        ? users.role.text
                                          ? users.role.text.length >= 10
                                            ? users.role.text.slice(0, 10) +
                                              "...."
                                            : users.role.text
                                          : ""
                                        : ""}
                                    </td>
                                    <td>
                                      <a
                                        className="btn btn-common"
                                        onClick={(event) =>
                                          this.viewDetails(users._id)
                                        }
                                      >
                                        {users.role
                                          ? users.role.unreadMsgCount
                                            ? users.role.unreadMsgCount
                                            : ""
                                          : ""}
                                        View More
                                      </a>
                                    </td>
                                    <td className="actions">
                                      <a className="action-icon mr-1">
                                        {" "}
                                        {interestUserId.indexOf(users._id) !=
                                        -1 ? (
                                          <span
                                            className="favorite"
                                            title="Remove Interest"
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
                                            className="unfavorite favorite"
                                            title="Show Interest"
                                            onClick={(event) =>
                                              this.addInterest(users._id)
                                            }
                                          >
                                            <i className="icon-heart"></i>
                                          </span>
                                        )}
                                      </a>
                                      <a className="action-icon">
                                        {" "}
                                        <span
                                          className="trash"
                                          title="Move to Trash"
                                          onClick={() =>
                                            this.deleteChat(
                                              users.role ? users.role._id : ""
                                            )
                                          }
                                        >
                                          <i className="icon icon-delete"></i>
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
