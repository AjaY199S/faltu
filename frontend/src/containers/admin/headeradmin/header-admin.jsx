/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";
import { Link } from "react-router-dom";
import * as session from "../../../utils/session";
import * as UserService from "../../../services/userAuthService";
import { LOGOUT } from "../../../globals/constant";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import URL from "../../../globals/config";
import history from "../../../history";
const IMG = base + "assets/images/customer.png";
export default class HeaderAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: "",
    };
  }

  logout = () => {
    confirmAlert({
      title: "Confirm",
      message: LOGOUT,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmLogout(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmLogout = () => {
    session.clearSession();
    history.push("/login");
  };

  componentWillMount = async () => {
    await UserService.checkLogin().then((response) => {
      if (response && !response.data.success) {
        session.clearSession();
        history.push("/");
      } else {
        this.setState({ userDetails: response.data.data });
      }
    });
  };

  render() {
    const { userDetails } = this.state;
    return (
      <div id="wrapper" className="wrapper admin-panel">
        <div className="navbar-custom-admin">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
              <a
                className="nav-link dropdown-toggle  waves-effect waves-light"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="fe-bell noti-icon"></i>
                <span className="badge badge-danger rounded-circle noti-icon-badge">
                  9
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-lg admin-profile-dropdown">
                <div className="dropdown-item noti-title">
                  <h5 className="m-0">
                    <span className="float-right">
                      <a href="#" className="text-dark">
                        <small>Clear All</small>
                      </a>
                    </span>
                    Notification
                  </h5>
                </div>

                <div className="slimscroll noti-scroll">
                  <a
                    href="notification-detail.php"
                    className="dropdown-item notify-item"
                  >
                    <div className="notify-icon bg-primary">
                      <i className="mdi mdi-comment-account-outline"></i>
                    </div>
                    <p className="notify-details">
                      Caleb Flakelar commented on Admin
                      <small className="text-muted">1 min ago</small>
                    </p>
                  </a>

                  <a
                    href="notification-detail.php"
                    className="dropdown-item notify-item"
                  >
                    <div className="notify-icon bg-warning">
                      <i className="mdi mdi-account-plus"></i>
                    </div>
                    <p className="notify-details">
                      New user registered.
                      <small className="text-muted">5 hours ago</small>
                    </p>
                  </a>

                  <a
                    href="notification-detail.php"
                    className="dropdown-item notify-item"
                  >
                    <div className="notify-icon bg-info">
                      <i className="mdi mdi-comment-account-outline"></i>
                    </div>
                    <p className="notify-details">
                      Caleb Flakelar commented on Admin
                      <small className="text-muted">4 days ago</small>
                    </p>
                  </a>

                  <a
                    href="notification-detail.php"
                    className="dropdown-item notify-item"
                  >
                    <div className="notify-icon bg-secondary">
                      <i className="mdi mdi-heart"></i>
                    </div>
                    <p className="notify-details">
                      Carlos Crouch liked <b>Admin</b>
                      <small className="text-muted">13 days ago</small>
                    </p>
                  </a>
                </div>

                <a className="dropdown-item text-center text-primary notify-item notify-all">
                  View all <i className="fi-arrow-right"></i>
                </a>
              </div>
            </li>

            <li className="dropdown notification-list">
              <a
                className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <img
                  src={
                    userDetails
                      ? userDetails.profileImg
                        ? URL + userDetails.profileImg
                        : IMG
                      : IMG
                  }
                  alt="user-image"
                  className="rounded-circle"
                ></img>
                <span className="pro-user-name ml-1">
                  {userDetails
                    ? userDetails.firstName
                      ? userDetails.firstName
                      : "Admin"
                    : "Admin"}{" "}
                  {userDetails
                    ? userDetails.lastName
                      ? userDetails.lastName
                      : "User"
                    : "User"}
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
                <Link
                  to="/admin/view-profile"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-user"></i> <span>My Profile</span>
                </Link>
                <Link
                  to="/admin/update-profile"
                  className="dropdown-item notify-item"
                >
                  <i className="fa fa-wrench" aria-hidden="true"></i>
                  <span>Update Profile</span>
                </Link>
                <Link
                  to="/admin/change-password"
                  className="dropdown-item notify-item"
                >
                  <i className="fa fa-unlock-alt"></i>
                  <span>Change Password</span>
                </Link>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item notify-item logout"
                  onClick={this.logout}
                >
                  <i className="fe-log-out"></i> <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>

          <div className="logo-box">
            <a href="index.php" className="logo text-center">
              <img
                src={base + "assets/images/footer-logo.png"}
                className="img-fluid"
                alt="logo-img"
              ></img>
            </a>
            <a href="index.php" className="fav-icon text-center d-none">
              <img src={"assets/images/fav-32.png"}></img>
            </a>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
