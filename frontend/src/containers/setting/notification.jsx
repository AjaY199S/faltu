/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedPlan: false,
      receivesMsg: false,
      profileViewed: false,
      interestedMe: true,
    };
  }

  componentWillMount = async () => {
    await UserService.getNotifiation().then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        this.setState(responseData.data);
      }
    });
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: JSON.parse(event.target.value) });
  };

  submitHandle = async () => {
    await UserService.addNotification(this.state).then((response) => {
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
      subscribedPlan,
      receivesMsg,
      profileViewed,
      interestedMe,
    } = this.state;
    return (
      <div>
        <div
          className="tab-pane show"
          id="v-pills-notifications"
          role="tabpanel"
          aria-labelledby="v-pills-notifications-tab"
        >
          <div className="text-center border-primary mb-2">
            <h3 className="font-weight-light text-primary pb-3">
              Notifications
            </h3>
          </div>
          <div className="mb-4">
            <p>Update your notifications</p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 mb-4">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Subscribed to any plan?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Yes{" "}
                        <input
                          type="radio"
                          name="subscribedPlan"
                          value="true"
                          onChange={this.formHandler}
                          checked={subscribedPlan}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        No{" "}
                        <input
                          type="radio"
                          name="subscribedPlan"
                          value="false"
                          onChange={this.formHandler}
                          checked={!subscribedPlan}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 mb-4">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Receives message/audio/video?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Yes{" "}
                        <input
                          type="radio"
                          name="receivesMsg"
                          value="true"
                          onChange={this.formHandler}
                          checked={receivesMsg}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        No{" "}
                        <input
                          type="radio"
                          name="receivesMsg"
                          value="false"
                          onChange={this.formHandler}
                          checked={!receivesMsg}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 mb-4">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Is Profile Viewed?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Yes{" "}
                        <input
                          type="radio"
                          name="profileViewed"
                          value="true"
                          onChange={this.formHandler}
                          checked={profileViewed}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        No{" "}
                        <input
                          type="radio"
                          name="profileViewed"
                          value="false"
                          onChange={this.formHandler}
                          checked={!profileViewed}
                        />{" "}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 mb-4">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Interested in me?
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="radio-label">
                        Yes{" "}
                        <input
                          type="radio"
                          name="interestedMe"
                          value="true"
                          onChange={this.formHandler}
                          checked={interestedMe}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="radio-label">
                        No{" "}
                        <input
                          type="radio"
                          name="interestedMe"
                          value="false"
                          onChange={this.formHandler}
                          checked={!interestedMe}
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
          <button
            onClick={this.submitHandle}
            className="bg-primary text-white rounded py-2 btn-common btn btn"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
