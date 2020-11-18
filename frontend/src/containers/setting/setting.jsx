import React from "react";
import base from "../../globals/base";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import showNotification from "../../services/notificationService";
import history from "../../history";
import * as UserService from "../../services/userAuthService";
import * as session from "../../utils/session";
import { ERRORMSG, LOGOUT } from "../../globals/constant";
import ProfileSetting from "./profile-setting";
import Notifications from "./notification";
import PaymentHistory from "./payment-history";
import UpdateEmail from "./update-email";
import Help from "./help";
import MySubscription from "./my-subscription";
export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.initialize = {
      setting: false,
      notification: false,
      subscription: false,
      payment: false,
      email: false,
      help: false,
    };
    this.state = this.initialize;
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
  confirmLogout = async () => {
    await UserService.logoutUser().then((resp) => {});
    session.clearSession();
    history.push("/");
  };
  componentWillMount = () => {
    if (this.props.location.pathname.indexOf("/setting") === 0) {
      if (this.props.location) {
        this.loadUrls(this.props.location);
      }
      this.unlisten = this.props.history.listen((location, action) => {
        this.loadUrls(location);
      });
    }
  };

  loadUrls = (location) => {
    let newUrl = location.pathname.split("/");
    if (newUrl[2]) {
      if (newUrl[2] != "") {
        this.setState(this.initialize);
        let url = newUrl[2];
        this.setState({ [url]: true });
      }
    } else {
      this.setState(this.initialize);
      this.setState({ setting: true });
    }
  };
  render() {
    const {
      setting,
      notification,
      subscription,
      payment,
      email,
      help,
    } = this.state;
    return (
      <div>
        <div
          className="custom-tabbing-style profile-setup pt-150 pb-150 settings"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="sidebar-box">
                  <div
                    className="nav flex-column nav-pills  navdashboard"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <Link
                      className={setting ? "nav-link active" : "nav-link"}
                      to="/setting"
                    >
                      <i className="icon-user pr-2"></i>Profile Settings
                    </Link>{" "}
                    <Link
                      className={notification ? "nav-link active" : "nav-link"}
                      to="/setting/notification"
                    >
                      <i className="icon-bell pr-2"></i>Notifications
                    </Link>{" "}
                    <Link
                      className={subscription ? "nav-link active" : "nav-link"}
                      to="/setting/subscription"
                    >
                      <i className="icon-scribd pr-2"></i>My Subscription
                    </Link>{" "}
                    <Link
                      className={payment ? "nav-link active" : "nav-link"}
                      to="/setting/payment"
                    >
                      <i className="icon-credit-card pr-2"></i>Payment History
                    </Link>{" "}
                    <Link
                      className={email ? "nav-link active" : "nav-link"}
                      to="/setting/email"
                    >
                      <i className="icon-envelope pr-2"></i>Update Email
                    </Link>{" "}
                    <Link
                      className={help ? "nav-link active" : "nav-link"}
                      to="/setting/help"
                    >
                      <i className="icon-question-circle pr-2"></i>Help
                    </Link>{" "}
                    <a className="nav-link" onClick={this.logout}>
                      <i className="icon-sign-out pr-2"></i>Logout
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content" id="v-pills-tabContent">
                  <Switch>
                    <Route
                      path="/setting/help"
                      className="nav-link"
                      component={Help}
                    />
                    <Route
                      path="/setting/email"
                      className="nav-link"
                      component={UpdateEmail}
                    />
                    <Route
                      path="/setting/payment"
                      className="nav-link"
                      component={PaymentHistory}
                    />
                    <Route
                      path="/setting/subscription"
                      className="nav-link"
                      component={MySubscription}
                    />
                    <Route
                      path="/setting/notification"
                      className="nav-link"
                      component={Notifications}
                    />
                    <Route
                      path="/setting/"
                      className="nav-link"
                      component={ProfileSetting}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
