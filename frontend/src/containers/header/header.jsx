/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";
import {
  APIBLOCK,
  PAGES,
  ACTIVITYTOWARDS,
  ACTIVITYFROM,
  LOGS,
} from "../../globals/constant";
import * as session from "../../utils/session";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import showNotification from "../../services/notificationService";
import history from "../../history";
import * as UserService from "../../services/userAuthService";
import { ERRORMSG, LOGOUT } from "../../globals/constant";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccess: false,
    };
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (date === "2020-12-14") {
      showNotification("danger", APIBLOCK);
    }
    /* window.onunload = () => {
      localStorage.removeItem("accessToken");
    }; */
  }

  componentWillMount = async () => {
    await UserService.checkLogin().then((response) => {
      if (response && !response.data.success) {
        session.clearSession();
        history.push("/");
      }
    });
    window.addEventListener("beforeunload", (e) => {
      // localStorage.removeItem("accessToken");
    });
  };

  componentWillUnmount = () => {
    window.addEventListener("beforeunload", (e) => {
      // localStorage.removeItem("accessToken");
    });
  };

  loadMenus = () => {
    const record = PAGES.map((data, key) => {
      return (
        <li key={key}>
          {session.getIsAuthenticated() ||
          session.getIsAuthenticated() === data.authenticate ? (
            <Link to={data.href}>{data.value}</Link>
          ) : (
            ""
          )}
        </li>
      );
    });
    return record;
  };

  loadActivity = () => {
    const activity = ACTIVITYTOWARDS.map((data, key) => {
      return (
        <li key={key}>
          {session.getIsAuthenticated() === data.authenticate ? (
            <Link className={data.className} to={data.href}>
              <i className={data.icon}></i>
              {data.value}
            </Link>
          ) : (
            ""
          )}
        </li>
      );
    });
    return activity;
  };

  loadActivityFrom = () => {
    const activity = ACTIVITYFROM.map((data, key) => {
      return (
        <li key={key}>
          {session.getIsAuthenticated() === data.authenticate ? (
            <Link className={data.className} to={data.href}>
              <i className={data.icon}></i>
              {data.value}
            </Link>
          ) : (
            ""
          )}
        </li>
      );
    });
    return activity;
  };

  logoutButton = () => {
    if (session.getIsAuthenticated()) {
      return (
        <li key="1234">
          <i
            className="fas fa-power-off bg-danger  text-white rounded py-2 logout"
            onClick={this.logout}
            title="Logout"
          ></i>{" "}
        </li>
      );
    } else {
      const logs = LOGS.map((data, key) => {
        return (
          <li key={key}>
            <Link
              style={{ marginRight: "10px" }}
              to={data.href}
              className={data.className}
            >
              {data.value}
            </Link>
          </li>
        );
      });
      return logs;
    }
  };

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
  confirmLogout = async () => {
    await UserService.logoutUser().then((resp) => {});
    session.clearSession();
    history.push("/");
  };

  render() {
    const { userAccess } = this.state;
    return (
      <header className="site-navbar py-0 bg-white" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-xl-2">
              <h1 className="mb-0 site-logo">
                <Link to="/" className="text-black mb-0">
                  <img
                    src={base + "assets/images/logo.png"}
                    className="img-fluid"
                    alt="img-logo"
                  ></img>
                </Link>
              </h1>
            </div>
            <div className="col-12 col-md-10 d-none d-xl-block">
              <nav className="site-navigation text-right" role="navigation">
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  {this.loadMenus()}

                  {session.getIsAuthenticated() ? (
                    <li className="nav-item activity dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Activity
                      </a>

                      <ul
                        className="dropdown-menu p-3 x"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <h4 className="pb-2 heading">
                          <span>Activity towards me</span>
                        </h4>
                        {this.loadActivity()}
                        <h4 className="pb-2 heading">
                          <span>Activity from me</span>
                        </h4>
                        {this.loadActivityFrom()}
                      </ul>
                    </li>
                  ) : (
                    ""
                  )}
                  {this.logoutButton()}
                </ul>
              </nav>
            </div>
            <div className="d-inline-block d-xl-none ml-auto py-3 col-6 text-right toggle-btn">
              <a href="#" className="site-menu-toggle js-menu-toggle">
                <span className="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
