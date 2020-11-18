/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
export default class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileHeading: props.getStore().profileHeading,
      aboutYourself: props.getStore().aboutYourself,
      lookingForInPartner: props.getStore().lookingForInPartner
    };
  }

  formHandler = event => {
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { profileHeading, aboutYourself, lookingForInPartner } = this.state;
    return (
      <div className="setup-content" id="step-5">
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            In your own words
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-field">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="profileHeading"
                  value={profileHeading}
                  onChange={this.formHandler}
                  placeholder="Your profile heading"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-field">
              <div className="form-group">
                <label className="control-label mb-2">
                  Tell about yourself
                </label>
                <textarea
                  name="aboutYourself"
                  value={aboutYourself}
                  onChange={this.formHandler}
                  className="form-control py-0 textarea"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-field">
              <div className="form-group">
                <label className="control-label mb-2">
                  What are you looking for in your spouse
                </label>
                <textarea
                  name="lookingForInPartner"
                  value={lookingForInPartner}
                  onChange={this.formHandler}
                  className="form-control py-0 textarea"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={this.props.saveInfo}
            className="btn btn-next-prev nextBtn btn-lg pull-right next action-button rounded bg-success m-0"
            type="button"
          >
            Save
          </button>
        </div>
        <hr />
      </div>
    );
  }
}
