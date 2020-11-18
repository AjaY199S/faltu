/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import csc from "country-state-city";
import { ERRORMSG, PERPAGE, SERVERURL } from "../../../globals/constant";

import base from "../../../globals/base";
const IMG = base + "assets/images/customer.png";
export default class Users extends React.Component {
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
      recordId: "",
      countryList: csc.getAllCountries(),
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
    let data = {
      body: body ? body : 1,
    };
    AdminServices.userLists(self.state.perPage, data)
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          await responseData.data.users.map(async (data) => {
            if (data.country) {
              let country = await csc.getCountryById(data.country);
              if (country) {
                data.country = country.name;
              } else {
                data.country = data.country;
              }
            }
          });
          self.setState({ userList: responseData.data.users });
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
      recordId: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNo: data.phoneNo,
      country: data.country,
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

  updateUserProfile = async () => {
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      country: this.state.country,
    };
    await AdminServices.updateUserProfile(this.state.recordId, body)
      .then((response) => {
        document.getElementById("close").click();
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
    let body = {
      id: id,
    };
    AdminServices.deleteUser(body)
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
      countryList,
      country,
    } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Users</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">Users</a>
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
                              <th>Phone No</th>
                              <th>Email</th>
                              <th>Country</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((users) => (
                              <tr key={users._id}>
                                <td className="table-user">
                                  <img
                                    src={
                                      users.profileImg
                                        ? SERVERURL + users.profileImg
                                        : IMG
                                    }
                                    alt="table-user"
                                    className="mr-2 rounded-circle"
                                    onError={(e) => {
                                      e.target.onError = "";
                                      e.target.src = { IMG };
                                    }}
                                  ></img>
                                  <a
                                    href=""
                                    className="text-body font-weight-semibold"
                                  >
                                    {users.firstName ? users.firstName : ""}
                                    &nbsp;
                                    {users.lastName ? users.lastName : ""}
                                  </a>
                                </td>
                                <td>{users.phoneNo ? users.phoneNo : "0"}</td>
                                <td>{users.email ? users.email : ""}</td>
                                <td>{users.country ? users.country : ""}</td>
                                <td>
                                  {users.isVerified === false ? (
                                    <span className="badge bg-soft-success text-danger">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-soft-success text-success">
                                      InActive
                                    </span>
                                  )}
                                </td>

                                <td className="actions">
                                  <a
                                    href=""
                                    className="action-icon"
                                    data-toggle="modal"
                                    data-target="#edit"
                                    title="Edit"
                                    onClick={() => this.getUserDetail(users)}
                                  >
                                    <i className="mdi mdi-square-edit-outline"></i>
                                  </a>
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
                      id="close"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <form>
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
                        <label className="control-label">Country</label>
                        <select
                          className="form-control"
                          onChange={this.formHandler}
                          autoComplete="off"
                          name="country"
                          value={country}
                          required
                        >
                          <option value="">Select Country</option>
                          {countryList.map((countrys, key) => (
                            <option key={key} value={countrys.name}>
                              {countrys.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={this.updateUserProfile}
                        className="btn btn-common"
                      >
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
