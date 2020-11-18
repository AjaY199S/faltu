/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG } from "../../globals/constant";

export default class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyWorkingAt: "",
      designation: "",
      organization: "",
      organizationLocation: "",
      salaryRange: "",
      highestDegree: ""
    };
  }

  componentWillMount = async () => {
    await UserService.userEducationCareerDetail()
      .then(response => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState(responseData.data);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandle = async () => {
    delete this.state._id;
    delete this.state.userId;
    delete this.state.createdOn;
    delete this.state.updatedOn;
    await UserService.UpdateEducation(this.state)
      .then(response => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const {
      currentlyWorkingAt,
      designation,
      organization,
      organizationLocation,
      salaryRange,
      highestDegree
    } = this.state;
    return (
      <div
        className="tab-pane fade active show"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <form>
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">
              Education and Career
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="currentlyWorkingAt"
                    onChange={this.handleChange}
                    value={currentlyWorkingAt}
                    type="text"
                    className="form-control"
                    placeholder="Currently working at"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="designation"
                    onChange={this.handleChange}
                    value={designation}
                    type="text"
                    className="form-control"
                    placeholder="Designation"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="organization"
                    onChange={this.handleChange}
                    value={organization}
                    type="text"
                    className="form-control"
                    placeholder="Organization"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="organizationLocation"
                    onChange={this.handleChange}
                    value={organizationLocation}
                    type="text"
                    className="form-control"
                    placeholder="Location of the Organization"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="salaryRange"
                    onChange={this.handleChange}
                    value={salaryRange}
                    type="text"
                    className="form-control"
                    placeholder="Salary Range"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <input
                    name="highestDegree"
                    onChange={this.handleChange}
                    value={highestDegree}
                    type="text"
                    className="form-control"
                    placeholder="Highest Degree"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={this.submitHandle}
              className="btn btn-common"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
