/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import { ERRORMSG } from "../../../globals/constant";
export default class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      role: "",
      email: "",
      firstName: "",
      lastName: ""
    };
  }

  componentWillMount = () => {
    this.getAdminProfile();
  };

  getAdminProfile = () => {
    AdminServices.adminProfile()
      .then(response => {
        let responseData = response.data;
        if (responseData.success === true) {
          this.setState({
            id: responseData.userData._id,
            role: responseData.userData.role
              ? responseData.userData.role
              : "Admin",
            email: responseData.userData.userId.email,
            firstName: responseData.firstName ? responseData.firstName : "User",
            lastName: responseData.lastName ? responseData.lastName : "Name"
          });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
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
                        <a href="user-account.php">User</a>
                      </li>
                      <li className="breadcrumb-item active">Add</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-box">
                    <div className="card">
                      <div className="card-body ">
                        <div className="row">
                          <div className="col-md-2 pr0">
                            <div className="profileimage">
                              <img
                                id="profile_file"
                                className="profile-pic"
                                src=""
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-10">
                            <div className="table-responsive">
                              <table
                                id="w0"
                                className="table table-striped table-bordered detail-view"
                              >
                                <tbody>
                                  <tr>
                                    <th>ID</th>
                                    <td colSpan="1">{this.state.id}</td>
                                  </tr>
                                  <tr>
                                    <th>Full Name</th>
                                    <td colSpan="1">
                                      {this.state.firstName}
                                      {this.state.lastName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Email</th>
                                    <td colSpan="1">
                                      <a>{this.state.email}</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Role</th>
                                    <td colSpan="1">{this.state.role}</td>
                                  </tr>
                                  <tr></tr>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
