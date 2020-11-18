/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ERRORMSG, PERPAGE, SERVERURL } from "../../../globals/constant";

export default class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogsList: [],
      count: 0,
      title: "",
      recordId: "",
      category: "",
      services: "",
      perPage: PERPAGE,
      errored: false,
    };
  }

  componentWillMount = () => {
    this.records();
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.records(selected);
  };

  records = (body) => {
    let self = this;
    body = body ? body : 1;
    AdminServices.blogsList(self.state.perPage, body)
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          self.setState({ blogsList: responseData.data });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  getUserDetail = (data) => {
    this.setState({
      recordId: data._id,
      title: data.title,
      category: data.category,
      services: data.services,
    });
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateRecord = async () => {
    let body = {
      title: this.state.title,
      category: this.state.category,
      services: this.state.services,
    };
    await AdminServices.updateBlogs(this.state.recordId, body)
      .then((response) => {
        document.getElementById("close").click();
        let responseData = response.data;
        if (responseData.success === true) {
          this.records();
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  addRecord = async () => {
    let body = {
      title: this.state.title,
      category: this.state.category,
      services: this.state.services,
    };
    await AdminServices.addBlogs(body)
      .then((response) => {
        document.getElementById("closeAdd").click();
        let responseData = response.data;
        if (responseData.success === true) {
          this.records();
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
          onClick: () => this.deleteRecord(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  deleteRecord = (id) => {
    AdminServices.removeBlogs(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          this.records();
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
    this.setState({ category: "", services: "", title: "" });
  };

  render() {
    const { perPage, blogsList, count, title, category, services } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Blogs</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">blogs</a>
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
                          <i className="mdi mdi-plus-circle mr-1"></i> Add Blogs
                        </a>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {blogsList.length > 0 ? (
                        <table
                          className="table table-centered table-striped"
                          id="products-datatable"
                        >
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Category</th>
                              <th>Services</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {blogsList.map((data) => (
                              <tr key={data._id}>
                                <td>{data.title ? data.title : ""}</td>
                                <td>{data.category ? data.category : ""}</td>
                                <td>{data.services ? data.services : ""}</td>
                                <td className="actions">
                                  <a
                                    href=""
                                    className="action-icon"
                                    data-toggle="modal"
                                    data-target="#edit"
                                    title="edit"
                                    onClick={() => this.getUserDetail(data)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>
                                  <a
                                    className="action-icon"
                                    title="Delete"
                                    onClick={() => this.deleteUser(data._id)}
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
                      id="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label className="control-label">Title</label>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title ? title : ""}
                        onChange={this.formHandler}
                        placeholder="Enter the title"
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Category</label>{" "}
                      <select
                        className="form-control"
                        name="category"
                        value={category}
                        onChange={this.formHandler}
                      >
                        <option value="">Select</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Silver">Silver</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Service</label>{" "}
                      <select
                        className="form-control"
                        name="services"
                        value={services}
                        onChange={this.formHandler}
                      >
                        <option value="">Select</option>
                        <option value="All">All</option>
                        <option value="Some">Some</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={this.updateRecord}
                      className="btn btn-common"
                    >
                      Update
                    </button>
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
                      <label className="control-label">Title</label>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title ? title : ""}
                        onChange={this.formHandler}
                        placeholder="Enter the title"
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Category</label>{" "}
                      <select
                        className="form-control"
                        name="category"
                        value={category}
                        onChange={this.formHandler}
                      >
                        <option value="">Select</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Silver">Silver</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Service</label>{" "}
                      <select
                        className="form-control"
                        name="services"
                        value={services}
                        onChange={this.formHandler}
                      >
                        <option value="">Select</option>
                        <option value="All">All</option>
                        <option value="Some">Some</option>
                      </select>
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
