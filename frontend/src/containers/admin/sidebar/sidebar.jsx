/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="left-side-menu">
        <div className="slimscroll-menu">
          <div id="sidebar-menu-admin">
            <ul className="metismenu" id="side-menu">
              <li>
                <Link to="/admin/">
                  <i className="fe-airplay"></i> <span>Dashboard </span>
                </Link>
              </li>
              <li>
                <a>
                  <i className="fa fa-bars"></i> <span>Manage </span>
                  <span className="menu-arrow"></span>
                </a>

                <ul className="nav-second-level" aria-expanded="false">
                  <li>
                    <Link to="/admin/user-list">
                      <i className="fe-users pr-1"></i>
                      User Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/financial-info">
                      <i className="fa fa-info-circle pr-1"></i> Financial Info
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/payments">
                      <i className="fa fa-credit-card pr-1"></i> Payment
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/blogs">
                      <i className="fa fa-th pr-1"></i> Blogs
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/admin/chats">
                  <i className="fa fa-commenting"></i>
                  <span>Chat & Message</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/reports">
                  <i className="fa fa-file"></i> <span> Reports </span>
                </Link>
              </li>
              <li>
                <Link to="/admin/feedback">
                  <i className="fa fa-star"></i>
                  <span>Feedback & Rating </span>
                </Link>
              </li>

              <li>
                <Link to="/admin/reported-users">
                  <i className="fa fa-users"></i> <span> Reported User</span>
                </Link>
              </li>
              <li>
                <a>
                  <i className="fa fa-file-text"></i>
                  <span> Content Pages </span>
                  <span className="menu-arrow"></span>
                </a>

                <ul className="nav-second-level" aria-expanded="false">
                  <li>
                    <Link to="/admin/terms">
                      <i className="fa fa-text-width pr-1"></i>Terms $
                      Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/aboutus">
                      <i className="fa fa-text-width pr-1"></i>ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/policy">
                      <i className="fa fa-text-width pr-1"></i>Privacy Policy
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/admin/contact-us">
                  <i className="fa fa-compress"></i> <span>Contacts </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
