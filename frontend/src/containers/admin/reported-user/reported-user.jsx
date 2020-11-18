/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import csc from "country-state-city";
import { ERRORMSG, PERPAGE, SERVERURL } from "../../../globals/constant";

import base from "../../../globals/base";
const IMG = base + "assets/images/customer.png";
export default class ReportedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      count: 0,
      userInfo: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      country: "",
      perPage: PERPAGE,
      errored: false,
    };
  }

  componentWillMount = () => {
    this.userLists();
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.userLists(selected);
  };

  userLists = (body) => {
    let self = this;
    body = body ? body : 1;
    AdminServices.reportUserList(self.state.perPage, body)
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          await responseData.data.map(async (data) => {
            if (data.reportedUserId && data.reportedUserId.country) {
              let country = await csc.getCountryById(
                data.reportedUserId.country
              );
              if (country) {
                data.reportedUserId.country = country.name;
              } else {
                data.reportedUserId.country = data.reportedUserId.country;
              }
            }
            if (data.userId && data.userId.country) {
              let country = await csc.getCountryById(data.userId.country);
              if (country) {
                data.userId.country = country.name;
              } else {
                data.userId.country = data.country;
              }
            }
          });
          this.setState({ userList: responseData.data });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  getUserDetail = (data) => {
    this.setState({ userInfo: data });
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNo: data.phoneNo,
      country: data.location
        ? data.location[0]
          ? data.location[0].country
            ? data.location[0].country
            : ""
          : ""
        : "",
    });
  };

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: base + "assets/images/customer.png",
        errored: true,
      });
    }
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateUserProfile = () => {};

  deleteUser = (id) => {
    confirmAlert({
      title: "Confirm for delete.",
      message: "Are you sure want to Delete this ?",
      buttons: [
        {
          label: "Yes",
          className: "alert-true",
          onClick: () => this.deleteUserRecord(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  deleteUserRecord = (id) => {
    AdminServices.removeReport(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          this.userLists();
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  handleChange = async (id, value) => {
    let body = {
      freeze: value,
      id: id,
    };
    console.log(body);
    return false;
    await AdminServices.updateStatus(body)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const {
      perPage,
      userList,
      count,
      userInfo,
      firstName,
      lastName,
      email,
      phoneNo,
      country,
    } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Reported Users</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">Reported Users</a>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      {userList.length > 0 ? (
                        <table
                          className="table table-centered table-striped"
                          id="products-datatable"
                        >
                          <thead>
                            <tr>
                              <th>Reported User</th>
                              <th>Reports To</th>
                              <th>Reported By</th>
                              <th>Report Abuse</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((users, key) => (
                              <tr key={users._id}>
                                <td className="table-user">
                                  <img
                                    src={
                                      users.reportedUserId
                                        ? users.reportedUserId.profileImg
                                          ? SERVERURL +
                                            users.reportedUserId.profileImg
                                          : IMG
                                        : IMG
                                    }
                                    alt="table-user"
                                    className="mr-2 rounded-circle"
                                    onError={(e) => {
                                      e.target.onError = "";
                                      e.target.src = { IMG };
                                    }}
                                  ></img>
                                </td>

                                <td>
                                  {" "}
                                  {users.reportedUserId
                                    ? users.reportedUserId.firstName
                                      ? users.reportedUserId.firstName
                                      : ""
                                    : ""}
                                  &nbsp;
                                  {users.reportedUserId
                                    ? users.reportedUserId.lastName
                                      ? users.reportedUserId.lastName
                                      : ""
                                    : ""}
                                </td>
                                <td>
                                  {users.userId
                                    ? users.userId.firstName
                                      ? users.userId.firstName
                                      : ""
                                    : ""}
                                  &nbsp;
                                  {users.userId
                                    ? users.userId.lastName
                                      ? users.userId.lastName
                                      : ""
                                    : ""}
                                </td>
                                <td>true</td>
                                <td>
                                  <div className="onoffswitch">
                                    <input
                                      type="checkbox"
                                      name="onoffswitch"
                                      className="onoffswitch-checkbox"
                                      id="myonoffswitch"
                                      onChange={(event) =>
                                        this.handleChange(
                                          users.reportedUserId
                                            ? users.reportedUserId._id
                                              ? users.reportedUserId._id
                                              : ""
                                            : "",
                                          users.reportedUserId
                                            ? !users.reportedUserId.freeze
                                              ? true
                                              : false
                                            : false
                                        )
                                      }
                                      checked={users.reportedUserId.freeze}
                                    />
                                    <label
                                      className="onoffswitch-label"
                                      htmlFor="myonoffswitch"
                                    >
                                      <div className="onoffswitch-inner"></div>
                                      <div className="onoffswitch-switch"></div>
                                    </label>
                                  </div>
                                </td>

                                <td className="actions">
                                  <a
                                    href=""
                                    className="action-icon"
                                    data-toggle="modal"
                                    data-target="#view"
                                    title="View"
                                    onClick={() =>
                                      this.getUserDetail(users.reportedUserId)
                                    }
                                  >
                                    <i className="fa fa-eye"></i>
                                  </a>
                                  <a
                                    className="action-icon"
                                    title="Delete"
                                    onClick={() => this.deleteUser(users._id)}
                                  >
                                    <i
                                      className="fa fa-trash delete"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <h5 className="text-center">No Record found!!</h5>
                      )}
                      <ReactPaginate
                        previousLabel={"←previous"}
                        nextLabel={"next→"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={count}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={perPage}
                        onPageChange={this.handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="edit">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title text-white">Upadte</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <form onSubmit={this.updateUserProfile}>
                    <div className="modal-body">
                      <div className="form-group">
                        <label className="control-label">First Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="firstName"
                          autoComplete="off"
                          placeholder="Enter the first name"
                          onChange={this.formHandler}
                          value={firstName ? firstName : ""}
                          required
                        ></input>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Last Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="lastName"
                          value={lastName ? lastName : ""}
                          autoComplete="off"
                          onChange={this.formHandler}
                          placeholder="Enter the last name"
                          required
                        ></input>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Email</label>
                        <label className="form-control" required>
                          {email}
                        </label>
                      </div>

                      <div className="form-group">
                        <label className="control-label">Contact No.</label>
                        <div className="input-icon">
                          <PhoneInput
                            country={"us"}
                            name="phoneNo"
                            className="form-control phone-user-details"
                            autoComplete="off"
                            value={phoneNo}
                            onChange={(phoneNo) => this.setState({ phoneNo })}
                            placeholder="Enter phone no"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Country</label>
                        <select
                          className="form-control"
                          onChange={this.formHandler}
                          autoComplete="off"
                          name="country"
                          value={country}
                          required
                        >
                          <option value="">Country</option>
                          <option value="India">India</option>
                          <option value="Autralia">Autralia</option>
                          <option value="USA">USA</option>
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-common">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal fade" id="view">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">View</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="fixed-image-admin">
                      <img
                        className="img-circle admin-user-image"
                        src={
                          userInfo.profileImg
                            ? SERVERURL + userInfo.profileImg
                            : IMG
                        }
                      ></img>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td>
                              {userInfo
                                ? userInfo.firstName
                                  ? userInfo.firstName
                                  : ""
                                : ""}
                              &nbsp;
                              {userInfo
                                ? userInfo.lastName
                                  ? userInfo.lastName
                                  : ""
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>
                              {userInfo
                                ? userInfo.email
                                  ? userInfo.email
                                  : ""
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th>Country</th>
                            <td>{userInfo.country ? userInfo.country : ""}</td>
                          </tr>

                          <tr>
                            <th>Phone No</th>
                            <td>{userInfo.phoneNo ? userInfo.phoneNo : "0"}</td>
                          </tr>
                          <tr>
                            <th>Profile For</th>
                            <td>
                              {userInfo.createdFor
                                ? userInfo.createdFor
                                : "Self"}
                            </td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>
                              {userInfo.isVerified === false ? (
                                <span className="badge bg-soft-success text-danger">
                                  Active
                                </span>
                              ) : (
                                <span className="badge bg-soft-success text-success">
                                  InActive
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
