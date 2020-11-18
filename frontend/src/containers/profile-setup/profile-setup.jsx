/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";
import * as UserService from "../../services/userAuthService";
import { SERVERURL } from "../../globals/constant";
import { Route, Switch, Router } from "react-router-dom";
import Education from "./education";
import Basic from "./basic";
import Media from "./media";
import Hobbies from "./hobbies";
import Personality from "./personality";
import * as session from "../../utils/session";
import { Link } from "react-router-dom";
export default class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.initialize = {
      userName: "",
      hobbies: false,
      media: false,
      profileSetup: false,
      education: false,
      personality: false,
      userName: "",
      memberNumber: "",
      profileImg: "",
    };
    this.state = this.initialize;
  }
  componentWillMount = async () => {
    if (session.getSession()) {
      await UserService.checkLogin()
        .then((response) => {
          let responseData = response.data;
          if (responseData.success) {
            this.setState({
              userName:
                responseData.data.firstName + " " + responseData.data.lastName,
              memberNumber: responseData.data.memberNumber,
              profileImg: responseData.data.profileImg,
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    }
    if (
      (this.props.location.pathname.indexOf("/profile-setup") === 0,
      "this.props.location.history")
    ) {
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
        let url = newUrl[2].split("-");
        this.setState({ [url[0]]: true });
      }
    } else {
      this.setState(this.initialize);
      this.setState({ profileSetup: true });
    }
  };

  render() {
    const {
      userName,
      hobbies,
      media,
      profileSetup,
      education,
      personality,
      memberNumber,
      profileImg,
    } = this.state;
    return (
      <div className="animated fadeInUp">
        <div
          className="custom-tabbing-style profile-setup pt-150 pb-150 search"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="sidebar-box">
                  <div className="user">
                    <figure>
                      <a href="#">
                        <img
                          src={
                            profileImg
                              ? SERVERURL + profileImg
                              : base + "assets/images/customer.png"
                          }
                          alt="image"
                        ></img>
                      </a>
                    </figure>
                    <div className="usercontent">
                      {userName ? <h3>Hello {userName}</h3> : ""}
                      {memberNumber ? <h3>ID : {memberNumber}</h3> : ""}
                    </div>
                  </div>
                  <div
                    className="nav flex-column nav-pills  navdashboard"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <Link
                      className={profileSetup ? "nav-link active" : "nav-link"}
                      to="/profile-setup"
                    >
                      <i className="icon icon-asterisk pr-2"></i>Basic Info
                    </Link>
                    <Link
                      className={education ? "nav-link active" : "nav-link"}
                      to="/profile-setup/education"
                    >
                      <i className="icon icon-university pr-2"></i>Education and
                      Career
                    </Link>
                    <Link
                      className={media ? "nav-link active" : "nav-link"}
                      to="/profile-setup/media"
                    >
                      <i className="icon icon-camera pr-2"></i>Media (Photos/
                      Videos)
                    </Link>
                    <Link
                      className={hobbies ? "nav-link active" : "nav-link"}
                      to="/profile-setup/hobbies"
                    >
                      <i className="icon icon-header pr-2"></i>Hobbies &
                      Interest
                    </Link>
                    <Link
                      className={personality ? "nav-link active" : "nav-link"}
                      to="/profile-setup/personality"
                    >
                      <i className="icon icon-user-md pr-2"></i>Personality
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div
                  className="tab-content advance-search"
                  id="v-pills-tabContent"
                >
                  <Switch>
                    <Route
                      path="/profile-setup/personality"
                      component={Personality}
                    />
                    <Route path="/profile-setup/hobbies" component={Hobbies} />
                    <Route path="/profile-setup/media" component={Media} />
                    <Route
                      path="/profile-setup/education"
                      component={Education}
                    />
                    <Route path="/" component={Basic} />
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
