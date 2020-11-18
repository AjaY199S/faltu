/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ERRORMSG, PERPAGE } from "../../../globals/constant";

export default class ContactsUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      count: 0,
      perPage: PERPAGE,
      userInfo: "",
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

    let data = {
      body: body ? body : 1,
    };
    AdminServices.contactList(self.state.perPage, data)
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          self.setState({ userList: responseData.data.data });
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
    AdminServices.removeContacts(id)
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
    const { perPage, userList, count, userInfo } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Contact Us</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">Contact Us</a>
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
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Comments</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((users) => (
                              <tr key={users._id}>
                                <td>{users.fullName ? users.fullName : "0"}</td>
                                <td>{users.email ? users.email : ""}</td>
                                <td>
                                  {users.comments
                                    ? users.comments.length >= 20
                                      ? users.comments.slice(0, 20) + "...."
                                      : users.comments
                                    : ""}
                                </td>

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
                            <th>User Name</th>
                            <td>
                              {userInfo
                                ? userInfo.fullName
                                  ? userInfo.fullName
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
                            <th>Comments</th>
                            <td>
                              {userInfo.comments ? userInfo.comments : ""}
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
