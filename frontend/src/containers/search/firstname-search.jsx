/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import csc from "country-state-city";
import {
  AGE,
  ERRORMSG,
  seconds_to_days_hours_mins_secs_str,
} from "../../globals/constant";
import MultipleCountry from "./multiple-country";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService"; // to show success notice

export default class FirstNameSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameSearch: "",
      gender: "",
      seeking: "",
      lastActive: "",
      sortResultsBy: "",
      singleCountry: "",
      state: "",
      city: "",
      within: "",
      searchingFor: [],
      age: "",
      minheight: "",
      maxheight: "",
      minweight: "",
      maxweight: "",
      theirEthnicityIsMostly: [],
      complexion: [],
      considerTheirAppearanceAs: [],
      hairColor: [],
      hairLength: [],
      hairType: [],
      eyeColor: [],
      eyeWear: [],
      facialHair: [],
      physicalAndHealthStatus: [],
      doYouDrink: [],
      doYouSmoke: [],
      willingToRelocate: [],
      maritalStatus: [],
      doYouHaveChildren: [],
      numberOfChildren: "",
      oldestChild: "",
      youngestChild: "",
      wantMoreChild: [],
      eatingHabits: [],
      occupation: [],
      employmentStatus: [],
      annualIncome: "",
      homeType: [],
      livingSituation: [],
      residencyStatus: [],
      nationality: "",
      education: "",
      languageSpoken: "",
      religion: [],
      bornReverted: [],
      religiousValue: [],
      attendReligiousService: [],
      readQuran: [],
      polygamy: [],
      familyValues: [],
      profileCreator: [],
      searchAs: "",
      countryList: csc.getAllCountries(),
      stateLists: [],
      cityList: [],
    };
    this.countryStore = {};
    this.stateList = [];
  }

  getCountryStore() {
    return this.countryStore;
  }

  updateCountryStore(field, val) {
    this.countryStore[field] = val;
  }
  loadAge = () => {
    return AGE.map((data, key) => {
      return (
        <option value={data} key={key}>
          {data}
        </option>
      );
    });
  };
  handleChange = (event) => {
    if (Array.isArray(this.state[event.target.id])) {
      if (this.state[event.target.id].indexOf(event.target.name) !== -1) {
        this.state[event.target.id].splice(
          this.state[event.target.id].indexOf(event.target.name),
          1
        );
      } else {
        this.state[event.target.id].push(event.target.name);
      }
      this.setState({ [event.target.id]: this.state[event.target.id] });
    } else {
      if (event.target.name === "country") {
        this.onCountryChange(event.target.value);
      }
      if (event.target.name === "state") {
        this.onCityChange(event.target.value);
      }
      this.setState({ [event.target.name]: event.target.value }, () => {});
    }
  };

  submitHandle = async () => {
    delete this.countryStore["[object Object]"];
    this.state = Object.assign(this.state, this.countryStore);
    await UserService.getPost(this.state)
      .then((response) => {
        let responseDatas = response.data;
        if (responseDatas.success) {
          responseDatas.data.map((data) => {
            if (data.dob && data.dob != "") {
              var today = new Date(data.dob);
              var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
              data.dob = date;
            }
            if (data.lastActive && data.lastActive != "") {
              let time =
                (new Date().getTime() - new Date(data.lastActive).getTime()) /
                1000;
              let newTime = seconds_to_days_hours_mins_secs_str(time);
              data.lastActive = newTime;
            }
          });
          this.props.history.push({
            pathname: "/results",
            state: {
              record: responseDatas.data,
            },
          });
        } else {
          showNotification("danger", responseDatas.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  onCountryChange = async (value) => {
    this.setState({
      stateLists: await csc.getStatesOfCountry(value),
      cityList: [],
    });
  };
  onCityChange = async (value) => {
    this.setState({ cityList: await csc.getCitiesOfState(value) });
  };

  render() {
    const {
      gender,
      seeking,
      lastActive,
      sortResultsBy,
      state,
      city,
      within,
      country,
      searchFor,
      age,
      hasPhoto,
      countryList,
      stateLists,
      cityList,
    } = this.state;
    return (
      <div>
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            First Name Search
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="text-field">
              <div className="form-group card border-0">
                <div className="card-body bg-light">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-field">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstNameSearch"
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label className="mb-1">I'm a</label>{" "}
                        <select
                          className="form-control mb-0"
                          name="gender"
                          value={gender}
                          onChange={this.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label className="mb-1">Seeking</label>{" "}
                        <select
                          className="form-control mb-0"
                          name="seeking"
                          value={seeking}
                          onChange={this.handleChange}
                        >
                          <option>Any</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label className="mb-1">Age</label>{" "}
                        <select
                          className="form-control mb-0"
                          name="age"
                          onChange={this.handleChange}
                          value={age}
                        >
                          <option>Any</option>
                          {this.loadAge()}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label className="mb-1">Last Active</label>{" "}
                        <select
                          className="form-control mb-0"
                          value={lastActive}
                          name="lastActive"
                          onChange={this.handleChange}
                        >
                          <option>Any</option>

                          <option>Within Week</option>
                          <option>Within 1 Month</option>
                          <option>Within 3 Months</option>
                          <option>Within 5 Months</option>
                          <option>Within 6 Months</option>
                          <option>Within Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label className="mb-1">Sort Results By</label>{" "}
                        <select
                          className="form-control mb-0"
                          name="sortResultsBy"
                          value={sortResultsBy}
                          onChange={this.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="createdOn">Newest Member</option>
                          <option value="profileImg">Photos First</option>
                          <option value="lastActive">Last Active</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2 pt-4">
                        <label className="radio-label">
                          Has photo?{" "}
                          <input
                            type="checkbox"
                            name="hasPhoto"
                            value={hasPhoto}
                            checked={hasPhoto === "off" ? true : false}
                            onChange={this.handleChange}
                          />{" "}
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 className="mb-3 text-color">Living in :</h5>
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#single"
                            name="singleCountry"
                            value="true"
                            id="1"
                          >
                            Single Country
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#multiple"
                            name="multipleCountry"
                            id="2"
                          >
                            Multiple Countries
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content px-2 py-3">
                        <div id="single" className="container tab-pane active">
                          <h4 className="text-color mb-3">Single Country</h4>
                          <div className="row text-left">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="mb-1">Country</label>{" "}
                                <select
                                  className="form-control mb-0"
                                  name="country"
                                  value={country}
                                  onChange={this.handleChange}
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
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="mb-1">State/Province</label>{" "}
                                <select
                                  className="form-control mb-0"
                                  name="state"
                                  value={state}
                                  onChange={this.handleChange}
                                >
                                  <option value="">Select State</option>
                                  {stateLists.map((state, key) => (
                                    <option key={key} value={state.id}>
                                      {state.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="mb-1">City</label>{" "}
                                <select
                                  className="form-control"
                                  name="city"
                                  value={city}
                                  onChange={this.handleChange}
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

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="mb-1">Within (kms)</label>{" "}
                                <select
                                  className="form-control mb-0"
                                  name="within"
                                  value={within}
                                  onChange={this.handleChange}
                                >
                                  <option>100</option>
                                  <option>200</option>
                                  <option>399</option>
                                  <option>400</option>
                                  <option>600</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-lg-12">
                              <p className="text-left">Searching For</p>
                              <div className="form-check form-check-inline float-left">
                                <label className="checkbox-label pl-4 mr-5 pr-5">
                                  Any{" "}
                                  <input
                                    type="checkbox"
                                    name="searchFor"
                                    value="Friendship"
                                    id="radio2"
                                    checked={searchFor === "Friendship"}
                                    onChange={this.handleChange}
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>{" "}
                                <label className="checkbox-label pl-4 mr-5 pr-5">
                                  Marriage
                                  <input
                                    type="checkbox"
                                    name="searchFor"
                                    value="Marriage"
                                    checked={searchFor === "Marriage"}
                                    onChange={this.handleChange}
                                    id="radio2"
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="multiple"
                          className="container tab-pane fade multiple"
                          name="multiCountry"
                        >
                          <div
                            id="countries-accordion"
                            className="lifestyle-accordian"
                          >
                            <MultipleCountry
                              ref={this.child}
                              getCountryStore={() => this.getCountryStore()}
                              updateCountryStore={(field, val) => {
                                this.updateCountryStore(field, val);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={this.submitHandle}
                          className="btn btn-common"
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
      </div>
    );
  }
}
