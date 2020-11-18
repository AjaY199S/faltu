/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";

export default class UpdateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  componentWillMount = async () => {
    await UserService.checkLogin().then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        this.setState({ email: responseData.data.email });
      }
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    await UserService.updateEmail(this.state).then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        showNotification("success", responseData.message);
      } else {
        showNotification("danger", responseData.message);
      }
    });
  };

  render() {
    const { email } = this.state;
    return (
      <div>
        <div
          className="tab-pane show"
          id="v-pills-email"
          role="tabpanel"
          aria-labelledby="v-pills-email-tab"
        >
          <div className="text-center border-primary mb-2">
            <h3 className="font-weight-light text-primary pb-3">
              Update Email Address
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0 my-4">
                  <h6 className="text-color mb-3">Update Your Email Address</h6>
                  <div className="text-field">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control m-0"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <button
            onClick={this.handleSubmit}
            className="bg-primary text-white rounded py-2 btn-common btn btn"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
