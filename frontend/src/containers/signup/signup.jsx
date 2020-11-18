/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import csc from "country-state-city";
import base from "../../globals/base";
import * as UserService from "../../services/userAuthService";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import showNotification from "../../services/notificationService";
import history from "../../history";
import { ERRORMSG } from "../../globals/constant";
import * as session from "../../utils/session";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      country: "",
      createdFor: "",
      error: "",
      countryList: csc.getAllCountries(),
    };
  }

  componentWillMount = () => {
    if (session.getIsAuthenticated()) {
      this.props.history.push("/");
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();
    this.validatePhone();
    delete this.state.confirmPassword;
    delete this.state.countryList;
    delete this.state.error;
    await UserService.register(this.state)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          showNotification("success", responseData.message);
          history.push("/login");
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
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
  validatePhone() {
    let phoneNo = document.getElementById("phone-form-control");
    if (this.state.phoneNo.length < 1 || this.state.phoneNo == "+") {
      phoneNo.setCustomValidity("This field is required.");
    } else {
      phoneNo.setCustomValidity("");
    }
  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.phoneNo == "") {
      this.validatePhone();
    }
    this.validatePassword();
  };

  render() {
    const { countryList } = this.state;
    return (
      <div className="animated fadeInUp">
        <section
          className="register custom-tabbing-style pt-80 pb-150 pd-login-register"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12 col-xs-12">
                <div className="register-form login-area card-box mb-0">
                  <div className="text-center border-primary">
                    <h3 className="font-weight-light text-primary pb-3">
                      Sign Up
                    </h3>
                  </div>
                  <form className="login-form" onSubmit={this.submitHandler}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-user"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              name="firstName"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-user"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                              autoComplete="off"
                              name="lastName"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-envelope"></i>
                            <input
                              type="email"
                              id="sender-email"
                              name="email"
                              className="form-control"
                              placeholder="Enter Email Address"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-mobile"></i>
                            <PhoneInput
                              country={"us"}
                              type="tel"
                              name="phoneNo"
                              value={this.state.phoneNo}
                              onChange={(phoneNo) =>
                                this.setState(
                                  { phoneNo },
                                  () => this.validatePhone(),
                                  () => this.formHandler()
                                )
                              }
                              placeholder="Enter phone no"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-lock"></i>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter Password"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-lock"></i>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              id="confirm_password"
                              placeholder="Confirm Password"
                              onChange={this.formHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-map-marker"></i>

                            <select
                              className="form-control"
                              onChange={this.formHandler}
                              name="country"
                              required
                            >
                              <option value="">Select Country</option>
                              {countryList.map((countrys, key) => (
                                <option key={key} value={countrys.id}>
                                  {countrys.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="icon icon-user-md"></i>
                            <select
                              className="form-control"
                              name="createdFor"
                              onChange={this.formHandler}
                              required
                            >
                              <option value="">Profile Creating for</option>
                              <option value="Self">Self</option>
                              <option value="Son">Son</option>
                              <option value="Daughter">Daughter</option>
                              <option value="Brother">Brother</option>
                              <option value="Sister">Sister</option>
                              <option value="Relative">Relative</option>
                              <option value="Friend">Friend</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-common">
                        Register
                      </button>
                    </div>
                    <p className="red">{this.state.error}</p>
                  </form>
                  <hr></hr>
                  <div className="alreadymember w-100 text-center pb-4">
                    <ul className="pl-0 m-0">
                      <li>
                        Already a member ? <Link to="/login">Login</Link>
                      </li>
                    </ul>
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
