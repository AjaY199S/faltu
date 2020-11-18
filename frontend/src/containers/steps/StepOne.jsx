/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import DatePicker from "react-date-picker";
import csc from "country-state-city";
export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.getStore().firstName,
      lastName: props.getStore().lastName,
      gender: props.getStore().gender,
      province: props.getStore().province,
      country: props.getStore().country,
      dob: props.getStore().dob ? new Date(props.getStore().dob) : "",
      city: props.getStore().city,
      citizenship: props.getStore().citizenship,
      countryList: csc.getAllCountries(),
      stateList: props.getStore().country
        ? csc.getStatesOfCountry(props.getStore().country)
        : [],
      cityList: props.getStore().province
        ? csc.getCitiesOfState(props.getStore().province)
        : [],
    };
  }

  handleChange = (date) => {
    this.props.updateStore("dob", new Date(date));
    this.setState({
      dob: new Date(date),
    });
  };

  formHandler = async (event) => {
    if (event.target.name === "country") {
      this.onCountryChange(event.target.value);
    }
    if (event.target.name === "province") {
      this.onCityChange(event.target.value);
    }
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  onCountryChange = async (value) => {
    this.setState({
      stateList: await csc.getStatesOfCountry(value),
      cityList: [],
    });
  };
  onCityChange = async (value) => {
    this.setState({ cityList: await csc.getCitiesOfState(value) });
  };

  render() {
    const {
      firstName,
      lastName,
      gender,
      province,
      country,
      dob,
      city,
      citizenship,
      countryList,
      stateList,
      cityList,
    } = this.state;
    return (
      <div className="setup-content basic-info" id="step-1">
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">Your Basics</h3>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <input
                  name="firstName"
                  value={firstName}
                  onChange={this.formHandler}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <input
                  name="lastName"
                  value={lastName}
                  onChange={this.formHandler}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <select
                  name="gender"
                  value={gender}
                  onChange={this.formHandler}
                  className="form-control"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  yearPlaceholder="Date of Birth"
                  onChange={this.handleChange}
                  value={dob}
                  maxDate={new Date()}
                  name="dob"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <select
                  className="form-control"
                  name="country"
                  value={country}
                  onChange={this.formHandler}
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
                {" "}
                <select
                  className="form-control"
                  name="province"
                  value={province}
                  onChange={this.formHandler}
                >
                  <option value="">Select State</option>
                  {stateList.map((state, key) => (
                    <option key={key} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-field">
              <div className="form-group">
                <select
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={this.formHandler}
                >
                  <option value="">Select City</option>
                  {cityList.map((city, key) => (
                    <option key={key} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div className="input-icon">
                <select
                  className="form-control"
                  name="citizenship"
                  onChange={this.formHandler}
                  value={citizenship}
                >
                  <option value="">Select citizenship</option>
                  {countryList.map((countrys, key) => (
                    <option key={key} value={countrys.id}>
                      {countrys.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
