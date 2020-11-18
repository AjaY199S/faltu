/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { Link } from "react-router-dom";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
export default class ProfileSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineStatus: false,
      profileDisplay: false,
      country: "",
      dateTimeFormat: "",
      measeureUnits: "",
      timeStamp: "",
    };
  }

  componentWillMount = async () => {
    await UserService.profileSetting().then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        this.setState({
          onlineStatus: responseData.data.onlineStatus,
          profileDisplay: responseData.data.profileDisplay,
          country: responseData.data.country,
          dateTimeFormat: responseData.data.dateTimeFormat,
          measeureUnits: responseData.data.measeureUnits,
          timeStamp: responseData.data.timeStamp,
        });
      }
    });
  };

  formHandler = (event) => {
    if (
      event.target.name === "onlineStatus" ||
      event.target.name === "profileDisplay"
    ) {
      this.setState({ [event.target.name]: JSON.parse(event.target.value) });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  submitHandle = async () => {
    await UserService.settingAdd(this.state).then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        showNotification("success", responseData.message);
      } else {
        showNotification("danger", responseData.message);
      }
    });
  };

  render() {
    const {
      onlineStatus,
      profileDisplay,
      country,
      dateTimeFormat,
      measeureUnits,
      timeStamp,
    } = this.state;
    return (
      <div>
        <div
          className="tab-pane show active"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          <div className="text-center border-primary mb-2">
            <h3 className="font-weight-light text-primary pb-3">
              Profile Settings
            </h3>
          </div>
          <div className="mb-4">
            <p>Update your profile display options and localization</p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 m-0">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Online Status?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Show me as online{" "}
                        <input
                          type="radio"
                          name="onlineStatus"
                          value="true"
                          onChange={this.formHandler}
                          checked={onlineStatus}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        Show me as busy{" "}
                        <input
                          type="radio"
                          name="onlineStatus"
                          value="false"
                          onChange={this.formHandler}
                          checked={!onlineStatus}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 mb-2">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Display Profile?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Display my profile to users{" "}
                        <input
                          type="radio"
                          name="profileDisplay"
                          value="true"
                          onChange={this.formHandler}
                          checked={profileDisplay}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        Hide my profile from users{" "}
                        <input
                          type="radio"
                          name="profileDisplay"
                          value="false"
                          onChange={this.formHandler}
                          checked={!profileDisplay}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 text-left">
              <h4 className="mb-3 text-color text-center">Localization</h4>
              <label className="control label">Time Zones</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="country"
                    onChange={this.formHandler}
                    value={country}
                  >
                    <option value="">(Filter time zones by country)</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="America">America</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="timeStamp"
                    onChange={this.formHandler}
                    value={timeStamp}
                  >
                    <option value="GMT+05:30">
                      (GMT+05:30) India Standard Time
                    </option>
                    <option value="GMT+10:30">
                      (GMT+10:30) India Standard Time
                    </option>
                    <option value="GMT+11:20">
                      (GMT+11:20) India Standard Time
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="control label ">Date & Time Format</label>{" "}
                  <select
                    className="form-control"
                    name="dateTimeFormat"
                    onChange={this.formHandler}
                    value={dateTimeFormat}
                  >
                    <option value="Asia">Asia (Nederlands)</option>
                    <option value="Australia">Australia (Nederlands)</option>
                    <option value="Europe">Europe (Nederlands)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="control label ">Measurement Units</label>{" "}
                  <select
                    className="form-control"
                    name="measeureUnits"
                    onChange={this.formHandler}
                    value={measeureUnits}
                  >
                    <option value="Metric">Metric</option>
                    <option value="Metric / Imperial">Metric / Imperial</option>
                    <option value="Imperial USA">Imperial USA</option>
                    <option value="Imperial UK">Imperial UK</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="button text-right">
            <button onClick={this.submitHandle} className="btn-common btn">
              Submit
            </button>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 text-left">
              <h5 className="mb-2 text-color text-center">
                Switch Off Profile
              </h5>
              <p className="control label">
                To switch your profile off on Muslima.com please{" "}
                <a href="https://muslima.com/" className="text-color">
                  click here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
