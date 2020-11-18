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

export default class TrashChat extends React.Component {
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
    UserService.trashUserLists(self.state.perPage, body)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          responseData.data.users.map((data) => {
            data.date = moment(parseInt(data.timeStamp)).format("L");
            data.time = moment(parseInt(data.timeStamp)).format("hh:mm a");
            if (data.userDetails) {
              let userDetails = JSON.parse(data.userDetails);
              if (userDetails.dob && userDetails.dob != "") {
                let d1 = new Date(userDetails.dob);
                userDetails.dob = DIFFYRS(d1);
              }
              data.userDetails = userDetails;
            }
          });
          responseData.data.users.sort(function (x, y) {
            if (x.userDetails == "") {
              x.userDetails = { timeStamp: 0 };
            }
            if (y.userDetails == "") {
              y.userDetails = { timeStamp: 0 };
            }
            return x.userDetails.timeStamp - y.userDetails.timeStamp;
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

  deleteChat = (id) => {
    if (id) {
      confirmAlert({
        title: "Confirm",
        message: DELETE,
        buttons: [
          {
            label: "Yes",
            onClick: () => this.confirmDelete(id),
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
      await UserService.deletedChat(id)
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
      showNotification("danger");
    }
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.chatMemberLists(selected);
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
            <div className="row form-group m-0 ml-auto">
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
                                  <tr key={users.userDetails._id}>
                                    <td className="table-user">
                                      <div className="d-flex align-items-center">
                                        <div className="image pr-2">
                                          <img
                                            src={
                                              users.userDetails.profileImg
                                                ? SERVERURL +
                                                  users.userDetails.profileImg
                                                : IMG
                                            }
                                            alt="table-user"
                                            className="mr-2 rounded-circle"
                                          />
                                          <div
                                            className={
                                              users.userDetails.isOnline
                                                ? "circle online"
                                                : "circle offline"
                                            }
                                          ></div>
                                          <p className="mb-0 mt-1 text-center">
                                            {users.userDetails.isOnline
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
                                                {users.userDetails
                                                  ? users.userDetails.firstName
                                                  : ""}{" "}
                                                {users.userDetails
                                                  ? users.userDetails.lastName
                                                  : ""}
                                              </span>
                                            </li>
                                            <li className="common mb-1">
                                              <i className="icon-address-book pr-2"></i>
                                              {users.userDetails.dob
                                                ? users.userDetails.dob +
                                                  "years,"
                                                : ""}{" "}
                                              {users.userDetails.gender
                                                ? users.userDetails.gender
                                                : "NA"}
                                            </li>
                                            <li className="common mb-1	">
                                              <i className="icon-map-marker pr-2"></i>
                                              {users.userDetails.city
                                                ? users.userDetails.city + ","
                                                : ""}{" "}
                                              {users.userDetails.province
                                                ? users.userDetails.province +
                                                  ","
                                                : ""}{" "}
                                              {users.userDetails.country
                                                ? users.userDetails.country
                                                : ""}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="icon-calendar pr-2"></i>
                                      {users
                                        ? users.date
                                          ? users.date
                                          : ""
                                        : ""}
                                      <br />{" "}
                                      <i className="icon icon-watch"> </i>
                                      {users
                                        ? users.time
                                          ? users.time
                                          : ""
                                        : ""}
                                    </td>
                                    <td className="msg">
                                      <i className="icon-message pr-2"></i>
                                      {users
                                        ? users.text
                                          ? users.text.length >= 10
                                            ? users.text.slice(0, 10) + "...."
                                            : users.text
                                          : ""
                                        : ""}
                                    </td>
                                    <td className="actions">
                                      <a className="action-icon mr-1">
                                        {" "}
                                        {interestUserId.indexOf(
                                          users.userDetails._id
                                        ) != -1 ? (
                                          <span
                                            className="favorite"
                                            title="Remove Interest"
                                          >
                                            <i
                                              className="icon-heart"
                                              onClick={(event) =>
                                                this.removeInterest(
                                                  users.userDetails._id
                                                )
                                              }
                                            ></i>
                                          </span>
                                        ) : (
                                          <span
                                            className="unfavorite favorite"
                                            title="Show Interest"
                                            onClick={(event) =>
                                              this.addInterest(
                                                users.userDetails._id
                                              )
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
                                          title="Remove from Trash"
                                          onClick={() =>
                                            this.deleteChat(users._id)
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
