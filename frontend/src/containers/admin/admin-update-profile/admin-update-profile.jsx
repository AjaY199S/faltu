/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";
import * as AdminServices from "../../../services/adminServices";
import * as UserService from "../../../services/userAuthService";
import ShowNotification from "../../../services/notificationService";
import { ERRORMSG } from "../../../globals/constant";
export default class AdminUpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      Image: "",
    };
  }

  componentWillMount = () => {
    this.getAdminProfile();
  };

  getAdminProfile = () => {
    UserService.checkLogin()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({
            email: responseData.data.email,
            firstName: responseData.data.firstName,
            lastName: responseData.data.lastName,
          });
        } else {
          ShowNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        ShowNotification("danger", ERRORMSG);
      });
  };

  hnadleChange = (event) => {
    if (event.target.name === "Image") {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  submitHandle = async () => {
    let formData = new FormData();
    Object.keys(this.state).forEach((key) => {
      formData.append(key, this.state[key]);
    });
    await AdminServices.updateProfile(formData)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          ShowNotification("success", responseData.message);
          window.location.reload();
        } else {
          ShowNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const { email, firstName, lastName } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <form>
                    <div className="card-box">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="control-label">
                              Image Upload
                            </label>
                            <div className="avatar-upload">
                              <div className="avatar-edit">
                                <input
                                  type="file"
                                  id="imageUpload"
                                  name="Image"
                                  className="form-control"
                                  alt="Card image cap"
                                  onChange={this.hnadleChange}
                                />
                                <label htmlFor="imageUpload"></label>
                              </div>
                              <div>
                                <img
                                  id="imagePreview"
                                  className="avatar-preview"
                                  htmlFor="uploadImg"
                                  src=""
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              placeholder="Enter the name"
                              value={firstName}
                              onChange={this.hnadleChange}
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">Last Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              value={lastName}
                              onChange={this.hnadleChange}
                              placeholder="Enter Last Name"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">Email</label>
                            <span
                              className="form-control"
                              placeholder="Enter the email"
                            >
                              {email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 text-right">
                          <button
                            type="button"
                            onClick={this.submitHandle}
                            className="btn btn-common"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
