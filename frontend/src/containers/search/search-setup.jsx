/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";

import { Route, Switch } from "react-router-dom";

import { Link, NavLink } from "react-router-dom";
import AdvanceSearch from "./advance-search";
import PopularSearch from "./popular-searches";
import MemberNumber from "./member-number";
import KeywordSearch from "./keyword-search";
import FirstNameSearch from "./firstname-search";
import SavedSearch from "./saved-search";

export default class SearchSetup extends React.Component {
  constructor(props) {
    super(props);
    this.initialize = {
      advanced: false,
      saved: false,
      keyword: false,
      firstname: false,
      member: false,
      popular: false,
    };
    this.state = this.initialize;
  }
  componentWillMount = () => {
    if (
      (this.props.location.pathname.indexOf("/search-setup") === 0,
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
      this.setState({ advanced: true });
    }
  };

  render() {
    const { advanced, saved, keyword, firstname, member, popular } = this.state;
    return (
      <div>
        <div
          className="custom-tabbing-style profile-setup pt-150 pb-150 search"
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
                      className={advanced ? "nav-link active" : "nav-link"}
                      to="/search-setup/"
                    >
                      <i className="icon icon-adn pr-2"></i>Advanced Search
                    </Link>{" "}
                    <Link
                      className={saved ? "nav-link active" : "nav-link"}
                      to="/search-setup/saved-search"
                    >
                      <i className="icon icon-bookmark pr-2"></i>Saved Search
                    </Link>
                    <Link
                      to="/search-setup/keyword-search"
                      className={keyword ? "nav-link active" : "nav-link"}
                    >
                      <i className="icon icon-search pr-2"></i>Keyword Search
                    </Link>{" "}
                    <Link
                      to="/search-setup/firstname-search"
                      className={firstname ? "nav-link active" : "nav-link"}
                    >
                      <i className="icon icon-search pr-2"></i>First Name Search
                    </Link>{" "}
                    <Link
                      to="/search-setup/member-number"
                      className={member ? "nav-link active" : "nav-link"}
                    >
                      <i className="icon icon-list pr-2"></i>Member Number
                    </Link>{" "}
                    <Link
                      to="/search-setup/popular-search"
                      className={popular ? "nav-link active" : "nav-link"}
                    >
                      <i className="icon icon-fire pr-2"></i>Popular Searches
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content p-4" id="v-pills-tabContent">
                  <Switch>
                    <Route
                      className="nav-link"
                      path="/search-setup/firstname-search"
                      component={FirstNameSearch}
                    />
                    <Route
                      className="nav-link"
                      path="/search-setup/keyword-search"
                      component={KeywordSearch}
                    />
                    <Route
                      className="nav-link"
                      path="/search-setup/member-number"
                      component={MemberNumber}
                    />
                    <Route
                      className="nav-link"
                      path="/search-setup/popular-search"
                      component={PopularSearch}
                    />
                    <Route
                      className="nav-link"
                      path="/search-setup/saved-search"
                      component={SavedSearch}
                    />
                    <Route
                      path="/search-setup"
                      className="nav-link"
                      component={AdvanceSearch}
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
