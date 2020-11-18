/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import { AGE, ERRORMSG } from "../../globals/constant";

import showNotification from "../../services/notificationService"; // to show success notice
export default class MemberNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberNumber: ""
    };
  }

  handle = event => {
    this.setState({ memberNumber: event.target.value });
  };

  submitHandle = async () => {
    this.props.history.push({
      pathname: "/user-details",
      state: {
        record: this.state
      }
    });
  };

  render() {
    return (
      <div>
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Member Number Search
          </h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-field">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Member Number"
                  onChange={this.handle}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <button
                type="button"
                onClick={this.submitHandle}
                className="btn btn-common"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
