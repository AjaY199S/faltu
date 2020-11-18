/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doYouDrink: props.getStore().doYouDrink,
      doYouSmoke: props.getStore().doYouSmoke,
      eatingHabits: props.getStore().eatingHabits,
      maritalStatus: props.getStore().maritalStatus,
      doYouHaveChildren: props.getStore().doYouHaveChildren,
      numberOfChildren: props.getStore().numberOfChildren,
      oldestChild: props.getStore().oldestChild,
      youngestChild: props.getStore().youngestChild,
      wantMoreChild: props.getStore().wantMoreChild,
      occupation: props.getStore().occupation,
      employmentStatus: props.getStore().employmentStatus,
      homeType: props.getStore().homeType,
      livingSituation: props.getStore().livingSituation,
      residencyStatus: props.getStore().residencyStatus,
      willingToRelocate: props.getStore().willingToRelocate,
      relationshipYouAreLookingFor: props.getStore()
        .relationshipYouAreLookingFor,
      currentlyWorkingAt: props.getStore().currentlyWorkingAt,
      designation: props.getStore().designation,
      organization: props.getStore().organization,
      locationOfOrganization: props.getStore().locationOfOrganization,
      annualIncome: props.getStore().annualIncome,
      highestDegree: props.getStore().highestDegree,
      disabled: false,
    };
  }

  formHandler = (event) => {
    if (
      event.target.name === "doYouHaveChildren" &&
      event.target.value === "No"
    ) {
      this.setState({ disabled: true });
    }
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      doYouDrink,
      doYouSmoke,
      eatingHabits,
      maritalStatus,
      doYouHaveChildren,
      numberOfChildren,
      oldestChild,
      youngestChild,
      wantMoreChild,
      occupation,
      employmentStatus,
      homeType,
      residencyStatus,
      willingToRelocate,
      livingSituation,
      relationshipYouAreLookingFor,
      annualIncome,
      disabled,
    } = this.state;
    return (
      <div className="setup-content" id="step-3">
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Your Lifestyle
          </h3>
        </div>
        <div id="lifestyle-accordion" className="lifestyle-accordian">
          <div className="row">
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Do you drink?</label>
                  <select
                    className="form-control"
                    name="doYouDrink"
                    value={doYouDrink}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Do drink</option>
                    <option>Occasionally drink</option>
                    <option>Don't drink</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Do you smoke?</label>
                  <select
                    className="form-control"
                    name="doYouSmoke"
                    value={doYouSmoke}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Do smoke</option>
                    <option>Occasionally smoke</option>
                    <option>Don't smoke</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Eating Habits</label>
                  <select
                    className="form-control"
                    name="eatingHabits"
                    value={eatingHabits}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Halal foods always</option>
                    <option>Halal foods when I can</option>
                    <option>No special restrictions</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Marital Status</label>
                  <select
                    className="form-control"
                    name="maritalStatus"
                    value={maritalStatus}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Single</option>
                    <option>Separated</option>
                    <option>Widowed</option>
                    <option>Divorced</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Do you have children?</label>
                  <select
                    className="form-control"
                    name="doYouHaveChildren"
                    value={doYouHaveChildren}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>No</option>
                    <option>Yes - don't live at home</option>
                    <option>Yes - sometimes live at home</option>
                    <option>Yes - live at home</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Number of children</label>
                  <select
                    disabled={disabled}
                    className="form-control"
                    name="numberOfChildren"
                    value={numberOfChildren}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>More than 8</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Oldest child</label>
                  <select
                    disabled={disabled}
                    className="form-control"
                    name="oldestChild"
                    value={oldestChild}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>Older than 18</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Youngest child</label>
                  <select
                    disabled={disabled}
                    className="form-control"
                    name="youngestChild"
                    value={youngestChild}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>Older than 18</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Do you want (more) children?</label>
                  <select
                    className="form-control"
                    name="wantMoreChild"
                    value={wantMoreChild}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Occupation</label>
                  <select
                    className="form-control"
                    name="occupation"
                    value={occupation}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Administrative / Secretarial / Clerical</option>
                    <option>Artistic / Creative / Performance</option>
                    <option>Construction / Trades</option>
                    <option>Domestic Helper</option>
                    <option>Education / Academic</option>
                    <option>Entertainment / Media</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Employment status</label>
                  <select
                    className="form-control"
                    name="employmentStatus"
                    value={employmentStatus}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Student</option>
                    <option>Part Time</option>
                    <option>Full Time</option>
                    <option>Homemaker</option>
                    <option>Retired</option>
                    <option>Not Employed</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Annual Income</label>
                  <select
                    className="form-control"
                    name="annualIncome"
                    value={annualIncome}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Rs0 - Rs75,000 (INR)</option>
                    <option>Rs75,001 - Rs150,000 (INR)</option>
                    <option>Rs150,001 - Rs300,000 (INR)</option>
                    <option>Rs300,001 - Rs450,000 (INR)</option>
                    <option>Rs450,001 - Rs600,000 (INR)</option>
                    <option>Rs600,001 - Rs1,500,000+ (INR)</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Home Type</label>
                  <select
                    className="form-control"
                    name="homeType"
                    value={homeType}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Apartment / Flat</option>
                    <option>Condominium</option>
                    <option>Farm</option>
                    <option>House</option>
                    <option>Town house</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Living situation</label>
                  <select
                    className="form-control"
                    name="livingSituation"
                    value={livingSituation}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Live Alone</option>
                    <option>Live with friends</option>
                    <option>Live with family</option>
                    <option>Live with kids</option>
                    <option>Live with spouse</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Residency status</label>
                  <select
                    className="form-control"
                    name="residencyStatus"
                    value={residencyStatus}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Citizen</option>
                    <option>Permanent Resident</option>
                    <option>Work Permit</option>
                    <option>Student Visa</option>
                    <option>Temporary Visa</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Willing to relocate</label>
                  <select
                    className="form-control"
                    name="willingToRelocate"
                    value={willingToRelocate}
                    onChange={this.formHandler}
                  >
                    <option value="">Please Select...</option>
                    <option>Willing to relocate within my country</option>
                    <option>Willing to relocate to another country</option>
                    <option>Not willing to relocate</option>
                    <option>Not sure about relocating</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-2 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Relationship you're looking for
                  </h5>

                  <div className="form-check">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="radio-label">
                          Marriage{" "}
                          <input
                            name="relationshipYouAreLookingFor"
                            value="Marriage"
                            onChange={this.formHandler}
                            type="radio"
                            checked={
                              relationshipYouAreLookingFor === "Marriage"
                            }
                          ></input>
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-lg-6">
                        <label className="radio-label">
                          Friendship{" "}
                          <input
                            name="relationshipYouAreLookingFor"
                            value="Friendship"
                            checked={
                              relationshipYouAreLookingFor === "Friendship"
                            }
                            onChange={this.formHandler}
                            type="radio"
                          ></input>
                          <span className="checkmark"></span>
                        </label>
                      </div>
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
