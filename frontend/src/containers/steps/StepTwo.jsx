/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import { HEIGHT, WEIGHT } from "../../globals/constant";

export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hairColor: props.getStore().hairColor,
      hairLength: props.getStore().hairLength,
      hairType: props.getStore().hairType,
      eyeColor: props.getStore().eyeColor,
      height: props.getStore().height,
      weight: props.getStore().weight,
      bodyType: props.getStore().bodyType,
      ethnicity: props.getStore().ethnicity,
      complexion: props.getStore().complexion,
      considerMyselfAs: props.getStore().considerMyselfAs,
      physicalAndHealthStatus: props.getStore().physicalAndHealthStatus,
      facialHair: props.getStore().facialHair,
      eyeWear: props.getStore().eyeWear
    };
  }

  formHandler = event => {
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  loadHeights = () => {
    const heightData = HEIGHT.map((data, key) => {
      return (
        <option value={data.id} key={key}>
          {data.value}
        </option>
      );
    });
    return heightData;
  };

  loadWeights = () => {
    return WEIGHT.map((data, key) => {
      return (
        <option value={data.id} key={key}>
          {data.value}
        </option>
      );
    });
  };

  render() {
    const {
      hairColor,
      hairLength,
      hairType,
      eyeColor,
      height,
      weight,
      bodyType,
      ethnicity,
      complexion,
      considerMyselfAs,
      physicalAndHealthStatus,
      eyeWear,
      facialHair
    } = this.state;

    return (
      <div className="setup-content" id="step-2">
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Your Appearance
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Hair Color</label>
                <select
                  className="form-control"
                  name="hairColor"
                  value={hairColor}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Blue</option>
                  <option>Pink</option>
                  <option>Black</option>
                  <option>Brown</option>
                  <option>Dark Blue</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Hair Length</label>
                <select
                  className="form-control"
                  name="hairLength"
                  value={hairLength}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Bald</option>
                  <option>Bald on Top</option>
                  <option>Shaved</option>
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Hair Type</label>
                <select
                  className="form-control"
                  name="hairType"
                  value={hairType}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Straight</option>
                  <option>Wavy</option>
                  <option>Curly</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Eye Color</label>
                <select
                  className="form-control"
                  name="eyeColor"
                  value={eyeColor}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Black</option>
                  <option>Blue</option>
                  <option>Brown</option>
                  <option>Green</option>
                  <option>Grey</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Eye Wear</label>
                <select
                  className="form-control"
                  name="eyeWear"
                  value={eyeWear}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Contacts</option>
                  <option>Glasses</option>
                  <option>None</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Height</label>
                <select
                  className="form-control"
                  name="height"
                  value={height}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  {this.loadHeights()}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Weight</label>
                <select
                  className="form-control"
                  name="weight"
                  value={weight}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  {this.loadWeights()}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Body Type</label>
                <select
                  className="form-control"
                  name="bodyType"
                  value={bodyType}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Petite</option>
                  <option>Slim</option>
                  <option>Athletic</option>
                  <option>Average</option>
                  <option>Few Extra Pounds</option>
                  <option>Full Figured</option>
                  <option>Large and Lovely</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Your ethnicity</label>
                <select
                  className="form-control"
                  name="ethnicity"
                  value={ethnicity}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Arab (Middle Eastern)</option>
                  <option>Asian</option>
                  <option>Black</option>
                  <option>Caucasian (White)</option>
                  <option>Hispanic / Latino</option>
                  <option>Indian</option>
                  <option>Mixed</option>
                  <option>Pacific Islander</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Complexion</label>
                <select
                  className="form-control"
                  name="complexion"
                  value={complexion}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Very Fair</option>
                  <option>Fair</option>
                  <option>Wheatish</option>
                  <option>Wheatish Brown</option>
                  <option>Dark</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Facial hair</label>
                <select
                  className="form-control"
                  name="facialHair"
                  value={facialHair}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Clean Shaven</option>
                  <option>Sideburns</option>
                  <option>Mustache</option>
                  <option>Goatee</option>
                  <option>Short Beard</option>
                  <option>Medium Beard</option>
                  <option>Long Beard</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">I consider myself appearance as</label>
                <select
                  className="form-control"
                  name="considerMyselfAs"
                  value={considerMyselfAs}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Below average</option>
                  <option>Average</option>
                  <option>Attractive</option>
                  <option>Very attractive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <label className="mb-1">Physical/health status</label>
                <select
                  className="form-control"
                  name="physicalAndHealthStatus"
                  value={physicalAndHealthStatus}
                  onChange={this.formHandler}
                >
                  <option value="">Please Select...</option>
                  <option>Normal</option>
                  <option>Minor Health Issues</option>
                  <option>Serious Health Issues</option>
                  <option>Minor Physical Disability</option>
                  <option>Major Physical Disability</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
