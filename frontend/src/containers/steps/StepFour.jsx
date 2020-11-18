/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import csc from "country-state-city";
var languages = require("../../../node_modules/languages/languages.js");
export default class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationality: props.getStore().nationality,
      education: props.getStore().education,
      religion: props.getStore().religion,
      bornReverted: props.getStore().bornReverted,
      religiousValues: props.getStore().religiousValues,
      attendReligiousServices: props.getStore().attendReligiousServices,
      readQuran: props.getStore().readQuran,
      polygamy: props.getStore().polygamy,
      familyValues: props.getStore().familyValues,
      profileCreator: props.getStore().profileCreator,
      options: [],
      languagesSpoken: this.props.getStore().languagesSpoken
        ? this.props.getStore().languagesSpoken
        : [],
      countryList: csc.getAllCountries(),
    };
  }
  onSelect = (selectedItem) => {
    {
      this.setState({ languagesSpoken: selectedItem });
    }
    this.props.getStore().languagesSpoken = this.state.languagesSpoken;
  };
  onRemove = (selectedItem) => {
    {
      this.setState({ languagesSpoken: selectedItem });
    }
    this.props.getStore().languagesSpoken = this.state.languagesSpoken;
  };

  formHandler = (event) => {
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount = async () => {
    let langscodes = await languages.getAllLanguageCode();
    let arr = [];
    await langscodes.map(async (data) => {
      let lang = await languages.getLanguageInfo(data);
      arr.push({ name: lang.nativeName });
    });
    this.setState({ options: arr });
  };

  render() {
    const {
      nationality,
      education,
      languagesSpoken,
      religion,
      bornReverted,
      religiousValues,
      attendReligiousServices,
      readQuran,
      polygamy,
      familyValues,
      profileCreator,
      countryList,
      options,
    } = this.state;
    return (
      <div className="setup-content" id="step-4">
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Religious Background
          </h3>
        </div>
        <div id="religious-accordion" className="lifestyle-accordian">
          <div className="row">
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Nationality</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="nationality"
                    value={nationality}
                  >
                    <option value="">Select Country</option>
                    {countryList.map((countrys, key) => (
                      <option key={key} value={countrys.id}>
                        {countrys.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Education</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="education"
                    value={education}
                  >
                    <option>Please Select...</option>
                    <option>Primary (Elementary) School</option>
                    <option>Middle School / Junior High</option>
                    <option>High School</option>
                    <option>Vocational College</option>
                    <option>Bachelors Degree</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Languages spoken</label>{" "}
                  <Multiselect
                    classNameName="select2-languages-spoken form-control"
                    options={options}
                    selectedValues={languagesSpoken}
                    onSelect={this.onSelect}
                    onRemove={this.onRemove}
                    displayValue="name"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Religion</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="religion"
                    value={religion}
                  >
                    <option>Please Select...</option>
                    <option>Islam - Sunni</option>
                    <option>Islam - Shiite</option>
                    <option>Islam - Sufism</option>
                    <option>Islam - Ahmadiyya</option>
                    <option>Islam - Other</option>
                    <option>Willing to revert</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Born / Reverted</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="bornReverted"
                    value={bornReverted}
                  >
                    <option>Please Select...</option>
                    <option>No</option>
                    <option>Born a muslim</option>
                    <option>Reverted to Islam</option>
                    <option>Plan to revert to Islam</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Religious values</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="religiousValues"
                    value={religiousValues}
                  >
                    <option>Please Select...</option>
                    <option>Very Religious</option>
                    <option>Religious</option>
                    <option>Not Religious</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Attend religious services</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="attendReligiousServices"
                    value={attendReligiousServices}
                  >
                    <option>Please Select...</option>
                    <option>Daily</option>
                    <option>Only on Jummah / Fridays</option>
                    <option>Sometimes</option>
                    <option>Only During Ramadan</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Read Qur'an</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="readQuran"
                    value={readQuran}
                  >
                    <option>Please Select...</option>
                    <option>Daily</option>
                    <option>Ocassionally</option>
                    <option>Only During Ramadan</option>
                    <option>Only on Jummah / Fridays</option>
                    <option>Read translated version</option>
                    <option>Never Read</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Polygamy</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="polygamy"
                    value={polygamy}
                  >
                    <option>Please Select...</option>
                    <option>Accept polygamy</option>
                    <option>Maybe accept polygamy</option>
                    <option>Don't accept polygamy</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Family values</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="familyValues"
                    value={familyValues}
                  >
                    <option>Please Select...</option>
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Liberal</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Profile creator</label>{" "}
                  <select
                    className="form-control"
                    onChange={this.formHandler}
                    name="profileCreator"
                    value={profileCreator}
                  >
                    <option>Please Select...</option>
                    <option>Self</option>
                    <option>Parent</option>
                    <option>Friend</option>
                    <option>Brother / Sister</option>
                    <option>Relative</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
