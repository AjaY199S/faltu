/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Loading from "react-fullscreen-loading";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import base from "../../globals/base";
import * as UserService from "../../services/userAuthService";
import { ERRORMSG } from "../../globals/constant";
import showNotification from "../../services/notificationService";
import * as session from "../../utils/session";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }
  componentWillMount = () => {
    if (session.getIsAuthenticated()) {
      this.props.history.push("/");
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    await UserService.login(this.state)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          if (responseData.data.user.role === "admin") {
            session.setSession(
              responseData.data.token,
              JSON.stringify(responseData.data.user)
            );
            setTimeout(() => {
              this.setState({ loading: false });
            }, 500);
            this.props.history.push("/admin");
          } else {
            session.setSession(
              responseData.data.token,
              JSON.stringify(responseData.data.user)
            );
            session.setisAuthenticated(true);
            setTimeout(() => {
              this.setState({ loading: false });
            }, 500);
            this.props.history.push("/");
          }
        } else {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 800);
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 800);
        showNotification("danger", ERRORMSG);
      });
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="animated fadeInUp">
        <section
          className="login pt-80 pb-150 pd-login-register"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-12 col-xs-12">
                <div className="login-form login-area card-box mb-0">
                  <div className="text-center border-primary">
                    <h3 className="font-weight-light text-primary pb-3">
                      Login Now
                    </h3>
                  </div>
                  <form className="login-form" onSubmit={this.submitHandler}>
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
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="icon icon-lock"></i>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          onChange={this.formHandler}
                          placeholder="Enter Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mb-2 d-flex align-items-center pt-2">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkedall"
                        ></input>
                        <label
                          className="custom-control-label m-0"
                          htmlFor="checkedall"
                        >
                          Keep me logged in
                        </label>
                      </div>
                      <a
                        className="forgetpassword ml-auto "
                        href="forgot-password.php"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-common p-2 btn-login-signup"
                      >
                        Login
                      </button>
                      <br></br>
                      <p className="mt-3 mb-2">Or Login With</p>
                      <ul className="pl-0 social-icons d-flex align-items-center justify-content-center">
                        <li>
                          <a href="#">
                            <i className="icon icon-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <hr></hr>
                    <p className="text-center m-0">
                      Don't have an account ?
                      <Link to="/signup"> Register here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Loading loading={loading} background="#999da3" loaderColor="#3498db" />
      </div>
    );
  }
}
