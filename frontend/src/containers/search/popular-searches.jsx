/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import {
  AGE,
  ERRORMSG,
  seconds_to_days_hours_mins_secs_str
} from "../../globals/constant";

import showNotification from "../../services/notificationService"; // to show success notice
export default class PopularSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  submitHandle = async () => {
    await UserService.newMemberSearch()
      .then(response => {
        let responseDatas = response.data;
        if (responseDatas.success) {
          responseDatas.data.map(data => {
            if (data.dob && data.dob != "") {
              var today = new Date(data.dob);
              var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data
            }
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  submitlatestPhotos = async () => {
    await UserService.latestPhotos()
      .then(response => {
        let responseDatas = response.data;

        if (responseDatas.success) {
          responseDatas.data.map(data => {
            if (data.dob && data.dob != "") {
              let today = new Date(data.dob);
              let date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data
            }
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  submitInMyArea = async () => {
    await UserService.inMyArea()
      .then(response => {
        let responseDatas = response.data;

        if (responseDatas.success) {
          responseDatas.data.map(data => {
            if (data.dob && data.dob != "") {
              var today = new Date(data.dob);
              var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data
            }
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };
  submitMyMatches = async () => {
    await UserService.myMatches()
      .then(response => {
        let responseDatas = response.data;
        if (responseDatas.success) {
          responseDatas.data.map(data => {
            if (data.dob && data.dob != "") {
              var today = new Date(data.dob);
              var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data
            }
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  submitMuslimWomenForMarriage = async () => {
    await UserService.MuslimWomenForMarriage()
      .then(response => {
        let responseDatas = response.data;

        if (responseDatas.success) {
          responseDatas.data.map(data => {
            if (data.dob && data.dob != "") {
              var today = new Date(data.dob);
              var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data
            }
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };
  render() {
    return (
      <div>
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Popular Searches
          </h3>
        </div>
        <hr />
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                onClick={this.submitMyMatches}
                className="btn btn-common"
              >
                My Matches
              </button>
              <button
                type="button"
                onClick={this.submitHandle}
                className="btn btn-common"
              >
                New Members
              </button>
              <button
                type="button"
                onClick={this.submitlatestPhotos}
                className="btn btn-common"
              >
                Latest Photos
              </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <a href="#" className="btn btn-common text-center">
                Most Popular
              </a>
              <button
                type="button"
                onClick={this.submitInMyArea}
                className="btn btn-common"
              >
                In My Area
              </button>
              <button
                type="button"
                onClick={this.submitMuslimWomenForMarriage}
                className="btn btn-common"
              >
                Muslim Women For marriage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
