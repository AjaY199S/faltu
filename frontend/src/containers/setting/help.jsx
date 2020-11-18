/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      comments: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    await UserService.help(this.state).then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        showNotification("success", responseData.message);
        this.setState({
          fullName: "",
          email: "",
          comments: "",
        });
      } else {
        showNotification("danger", responseData.message);
      }
    });
  };

  render() {
    const { fullName, email, comments } = this.state;
    return (
      <div>
        <div
          className="tab-pane show help"
          id="v-pills-help"
          role="tabpanel"
          aria-labelledby="v-pills-help-tab"
        >
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">Help</h3>
          </div>
          <div className="row">
            <div className="container mb-lg-5">
              <div className="row">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="ts-col-inner">
                    <div className="ts-contact-info box-border">
                      <span className="ts-contact-icon float-left">
                        <i className="icon icon-phone"></i>
                      </span>
                      <div className="ts-contact-content text-left">
                        <h3 className="ts-contact-title">Call Us</h3>
                        <p>1+(91) 458 654 528</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="ts-col-inner">
                    <div className="ts-contact-info box-border">
                      <span className="ts-contact-icon float-left">
                        <i className="icon icon-envelope"></i>
                      </span>
                      <div className="ts-contact-content text-left">
                        <h3 className="ts-contact-title">Mail Us</h3>
                        <p>admin@jomuslim.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ts-form width-100" id="ts-form">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mb-5 mb-lg-0">
                    <div className="error-container"></div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control form-name"
                            id="name"
                            name="fullName"
                            placeholder="Full Name"
                            type="text"
                            value={fullName}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control form-email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            className="form-control form-message required-field py-0"
                            id="message"
                            placeholder="Comments"
                            rows="8"
                            value={comments}
                            name="comments"
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        onClick={this.handleSubmit}
                        className="bg-primary text-white rounded py-2 btn-common btn btn"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
