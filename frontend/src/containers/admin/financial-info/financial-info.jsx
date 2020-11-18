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
export default class FinancialInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      count: 0,
      userInfo: "",
      title: "",
      price: "",
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
    body = body ? body : 1;
    AdminServices.getFinancial(self.state.perPage, body)
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          self.setState({ userList: responseData.data.users });
        } else {
          showNotification("danger", responseData.message);
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
      title: data.title,
      price: data.price,
    });
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateUserProfile = async () => {
    let body = {
      title: this.state.title,
      price: this.state.price,
    };
    await AdminServices.updateFinancial(this.state.recordId, body)
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
    AdminServices.removeFinancial(id)
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

  loadModal = () => {
    this.setState({ price: "", title: "" });
  };

  addRecord = async () => {
    let body = {
      title: this.state.title,
      price: this.state.price,
    };
    await AdminServices.addFinancialInfo(body)
      .then((response) => {
        document.getElementById("closeAdd").click();
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
    const { perPage, userList, count, userInfo, title, price } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Financial Info</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">Financial Info</a>
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
                    <div className="row mb-2">
                      <div className="col-sm-12 text-right">
                        <a
                          href=""
                          className="btn btn-common"
                          data-toggle="modal"
                          data-target="#add"
                          onClick={this.loadModal}
                        >
                          <i className="mdi mdi-plus-circle mr-1"></i> Add
                          Financial Info
                        </a>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {userList.length > 0 ? (
                        <table
                          className="table table-centered table-striped"
                          id="products-datatable"
                        >
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((users) => (
                              <tr key={users._id}>
                                <td>{users.title ? users.title : "0"}</td>
                                <td>{users.price ? users.price : ""}</td>
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
                      <ul className="pagination pagination-rounded justify-content-end mb-0 p-4">
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
                      </ul>
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
                        <label className="control-label">Title</label>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          autoComplete="off"
                          placeholder="Enter the Title"
                          onChange={this.formHandler}
                          value={title ? title : ""}
                          required
                        ></input>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Price</label>
                        <input
                          className="form-control"
                          type="text"
                          name="price"
                          value={price ? price : ""}
                          autoComplete="off"
                          onChange={this.formHandler}
                          placeholder="Enter Price"
                          required
                        ></input>
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
            <div className="modal fade" id="add">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title text-white">Add</h4>
                    <button
                      type="button"
                      className="close"
                      id="closeAdd"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label className="control-label">Title</label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        autoComplete="off"
                        placeholder="Enter the Title"
                        onChange={this.formHandler}
                        value={title ? title : ""}
                        required
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Price</label>
                      <input
                        className="form-control"
                        type="text"
                        name="price"
                        value={price ? price : ""}
                        autoComplete="off"
                        onChange={this.formHandler}
                        placeholder="Enter Price"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={this.addRecord}
                      className="btn btn-common"
                    >
                      Save
                    </button>
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
