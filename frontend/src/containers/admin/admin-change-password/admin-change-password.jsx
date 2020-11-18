/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import { ERRORMSG, PERPAGE } from "../../../globals/constant";
export default class AdminChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      confirmPassword: ""
    };
  }

  submitHandler = async event => {
    event.preventDefault();
    delete this.state.confirmPassword;
    await AdminServices.updatePassword(this.state)
      .then(response => {
        let responseData = response.data;
        if (responseData.success === true) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  validatePassword() {
    var password = document.getElementById("password"),
      confirm_password = document.getElementById("confirm_password");
    if (password.value.length < 8) {
      password.setCustomValidity(
        "Password length should not be less than 8 characters"
      );
    } else {
      password.setCustomValidity("");
    }
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity("");
    }
  }

  formHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.validatePassword();
  };

  render() {
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="p-3"></div>
                </div>
                <div className="card">
                  <form onSubmit={this.submitHandler}>
                    <div className="card-box">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">
                              Old Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Old Password"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              id="password"
                              className="form-control"
                              placeholder="Enter Password"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="control-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm_password"
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-12 text-right">
                          <button type="submit" className="btn btn-common">
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
