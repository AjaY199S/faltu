/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
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
export default class Payments extends React.Component {
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
    AdminServices.paymentUserList(self.state.perPage, body)
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
    if (data.createdOn) {
      data.createdOn = moment(
        parseInt(new Date(data.createdOn).getTime())
      ).format("LLL");
    }
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
    AdminServices.removePayment(id)
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
                  <h4 className="page-title">Payments</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/admin/">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/admin/payments">Payments</Link>
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
                              <th>User</th>
                              <th>Transaction ID</th>
                              <th>Payment Method</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((users) => (
                              <tr key={users._id}>
                                <td className="table-user">
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

                                <td>
                                  {users.transactionId
                                    ? users.transactionId
                                    : "NA"}
                                </td>
                                <td>
                                  {users.paymentMethod
                                    ? users.paymentMethod
                                    : ""}
                                </td>
                                <td>{users.amount ? users.amount : ""}</td>
                                <td className="actions">
                                  <a
                                    href=""
                                    className="action-icon"
                                    data-toggle="modal"
                                    data-target="#view"
                                    title="View"
                                    onClick={() => this.getUserDetail(users)}
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
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td>
                              {userInfo.userId
                                ? userInfo.userId.firstName
                                  ? userInfo.userId.firstName
                                  : ""
                                : ""}
                              &nbsp;
                              {userInfo.userId
                                ? userInfo.userId.lastName
                                  ? userInfo.userId.lastName
                                  : ""
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>
                              {userInfo.userId
                                ? userInfo.userId.email
                                  ? userInfo.userId.email
                                  : ""
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th>Transaction ID</th>
                            <td>
                              {userInfo.transactionId
                                ? userInfo.transactionId
                                : "NA"}
                            </td>
                          </tr>

                          <tr>
                            <th>Payment Method</th>
                            <td>
                              {userInfo.paymentMethod
                                ? userInfo.paymentMethod
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <th>Plan</th>
                            <td>{userInfo.plan ? userInfo.plan : "NA"}</td>
                          </tr>
                          <tr>
                            <th>Duration</th>
                            <td>
                              {userInfo.timePeriod ? userInfo.timePeriod : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <th>Time</th>
                            <td>
                              {userInfo.createdOn ? userInfo.createdOn : "NA"}
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
