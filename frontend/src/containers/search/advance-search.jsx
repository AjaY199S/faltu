/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import csc from "country-state-city";
import {
  HEIGHT,
  WEIGHT,
  AGE,
  ERRORMSG,
  seconds_to_days_hours_mins_secs_str,
} from "../../globals/constant";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService"; // to show success notice
import MultipleCountry from "./multiple-country";
export default class AdvanceSearch extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      gender: "",
      seeking: "",
      age: "",
      lastActive: "",
      sortResultsBy: "",
      hasPhoto: "",
      singleCountry: false,
      country: "",
      state: "",
      city: "",
      within: "",
      relationshipYouAreLookingFor: "",
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
      bodyType: [],
      stateId: "",
      savedSearchearchAs: "",
      record: "",
      options: [
        { name: "Arabic" },
        { name: "English" },
        { name: "French" },
        { name: "Pidgin" },
        { name: "Urdu" },
      ],
      countryList: csc.getAllCountries(),
      stateLists: [],
      cityList: [],
    };
    this.countryStore = {};
    this.stateList = [];
  }

  componentWillMount = async () => {
    if (this.props.location.state && this.props.location.state.record) {
      await UserService.getSaveRecord(this.props.location.state.record)
        .then((response) => {
          let responseData = response.data;
          if (responseData.success) {
            this.setState(responseData.data);
            this.countryStore = responseData.data;
          }
        })
        .catch((err) => {
          showNotification("danger", ERRORMSG);
        });
    }
  };

  getCountryStore() {
    return this.countryStore;
  }
  onSelect = (selectedItem) => {
    {
      this.setState({ languageSpoken: selectedItem });
    }
  };

  updateCountryStore(field, val) {
    this.countryStore[field] = val;
  }

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
      if (event.target.name === "hasPhoto") {
        if (event.target.value === "off" || event.target.value === "") {
          event.target.value = "on";
        } else {
          event.target.value = "off";
        }
      }
      if (event.target.name === "country") {
        this.onCountryChange(event.target.value);
      }
      if (event.target.name === "state") {
        this.onCityChange(event.target.value);
      }
      this.setState({ [event.target.name]: event.target.value }, () => {});
    }
  };

  dobPicker = (date) => {
    this.setState({
      lastActive: new Date(date),
    });
  };

  loadAge = () => {
    return AGE.map((data, key) => {
      return (
        <option value={data} key={key}>
          {data}
        </option>
      );
    });
  };

  submitHandle = async () => {
    delete this.countryStore["[object Object]"];
    this.state = Object.assign(this.state, this.countryStore);

    if (this.state.savedSearchearchAs != "") {
      await UserService.saveAdvanceSearch(this.state)
        .then((response) => {
          let responseData = response.data;
          if (responseData.success) {
            showNotification.success("success", responseData.data);
          }
        })
        .catch((err) => {});
    }
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

  resetValue = (event) => {
    this.setState({
      country: "",
      state: "",
      city: "",
      within: "",

      relationshipYouAreLookingFor: "",
    });
    this.child.current.resetCountry();
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
      age,
      lastActive,
      sortResultsBy,
      hasPhoto,
      country,
      state,
      city,
      within,
      relationshipYouAreLookingFor,
      minheight,
      maxheight,
      minweight,
      maxweight,
      theirEthnicityIsMostly,
      complexion,
      considerTheirAppearanceAs,
      hairColor,
      hairLength,
      hairType,
      eyeColor,
      eyeWear,
      facialHair,
      physicalAndHealthStatus,
      doYouDrink,
      doYouSmoke,
      willingToRelocate,
      maritalStatus,
      doYouHaveChildren,
      numberOfChildren,
      oldestChild,
      youngestChild,
      wantMoreChild,
      eatingHabits,
      occupation,
      employmentStatus,
      annualIncome,
      homeType,
      livingSituation,
      residencyStatus,
      nationality,
      education,
      languageSpoken,
      religion,
      bornReverted,
      religiousValue,
      attendReligiousService,
      readQuran,
      polygamy,
      familyValues,
      profileCreator,
      bodyType,
      savedSearchearchAs,
      countryList,
      stateLists,
      cityList,
    } = this.state;

    return (
      <div
        className="tab-pane fade show active advance-search"
        id="v-pills-advanced"
        role="tabpanel"
        aria-labelledby="v-pills-advanced-tab"
      >
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Advanced Search
          </h3>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="text-field">
              <div className="form-group card border-0">
                <div className="card-header p-0" id="headingBasic">
                  <h5 className="text-color mb-3">Basic Details</h5>
                </div>
                <div className="card-body bg-light">
                  <div className="row">
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
                  <hr />
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
                                  Friendship{" "}
                                  <input
                                    type="checkbox"
                                    name="relationshipYouAreLookingFor"
                                    value="Friendship"
                                    id="radio2"
                                    checked={
                                      relationshipYouAreLookingFor ===
                                      "Friendship"
                                    }
                                    onChange={this.handleChange}
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>{" "}
                                <label className="checkbox-label pl-4 mr-5 pr-5">
                                  Marriage
                                  <input
                                    type="checkbox"
                                    name="relationshipYouAreLookingFor"
                                    value="Marriage"
                                    checked={
                                      relationshipYouAreLookingFor ===
                                      "Marriage"
                                    }
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
                  <div className="row">
                    <div className="col-lg-12 text-center mt-4">
                      <a
                        href="#"
                        className="btn btn-common text-center"
                        onClick={this.resetValue}
                      >
                        Reset
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div id="appearance-accordion" className="lifestyle-accordian">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <div className="card-header p-0" id="headingAppearance">
                    <h5 className="mb-0">
                      <a
                        className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                        data-toggle="collapse"
                        data-target="#collapseAppearance"
                        aria-expanded="true"
                        aria-controls="collapseAppearance"
                      >
                        <p className="mb-0">Appearance</p>
                      </a>
                    </h5>
                  </div>
                  <div
                    className="collapse"
                    id="collapseAppearance"
                    aria-labelledby="headingAppearance"
                    data-parent="#appearance-accordion"
                  >
                    <div className="card-body bg-light">
                      <div
                        id="height-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingHeightAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseHeightAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseHeightAppearance"
                                    >
                                      <p className="mb-0">Height</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseHeightAppearance"
                                  aria-labelledby="headingHeightAppearance"
                                  data-parent="#height-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="minheight"
                                            value={minheight}
                                            onChange={this.handleChange}
                                          >
                                            <option value="">Any</option>
                                            {this.loadHeights()}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="maxheight"
                                            value={maxheight}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
                                            {this.loadHeights()}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="weight-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingWeightAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseWeightAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseWeightAppearance"
                                    >
                                      <p className="mb-0">Weight</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseWeightAppearance"
                                  aria-labelledby="headingWeightAppearance"
                                  data-parent="#weight-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="minweight"
                                            value={minweight}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
                                            {this.loadWeights()}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="maxweight"
                                            value={maxweight}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>

                                            {this.loadWeights()}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="body-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingBodyTypeAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseBodyTypeAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseBodyTypeAppearance"
                                    >
                                      <p className="mb-0">Body Type</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseBodyTypeAppearance"
                                  aria-labelledby="headingBodyTypeAppearance"
                                  data-parent="#body-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="bodyType"
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Petite
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="bodyType"
                                              name="Petite"
                                              checked={
                                                bodyType.indexOf("Petite") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Slim{" "}
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="bodyType"
                                              name="Slim"
                                              checked={
                                                bodyType.indexOf("Slim") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Athletic{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Athletic"
                                              type="checkbox"
                                              id="bodyType"
                                              checked={
                                                bodyType.indexOf("Athletic") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Average
                                            <input
                                              onChange={this.handleChange}
                                              name="average"
                                              type="checkbox"
                                              id="bodyType"
                                              checked={
                                                bodyType.indexOf("average") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Full Figured{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Full Figured"
                                              type="checkbox"
                                              id="bodyType"
                                              checked={
                                                bodyType.indexOf(
                                                  "Full Figured"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Large & Lovely{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Large & Lovely"
                                              type="checkbox"
                                              id="bodyType"
                                              checked={
                                                bodyType.indexOf(
                                                  "Large & Lovely"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Few Extra Pounds{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Few Extra Pounds"
                                              type="checkbox"
                                              id="bodyType"
                                              checked={
                                                bodyType.indexOf(
                                                  "Few Extra Pounds"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="ethnicity-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEthnicityAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEthnicityAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseEthnicityAppearance"
                                    >
                                      <p className="mb-0">
                                        Their Ethnicity is mostly
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEthnicityAppearance"
                                  aria-labelledby="headingEthnicityAppearance"
                                  data-parent="#ethnicity-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Arab (Middle Eastern){" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Arab ()Middle Eastern"
                                              type="checkbox"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Arab ()Middle Eastern"
                                                ) != -1
                                              }
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Asian{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Asian"
                                              type="checkbox"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Asian"
                                                ) != -1
                                              }
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Black{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Black"
                                              type="checkbox"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Black"
                                                ) != -1
                                              }
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Hispanic / Latino{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Hispanic/Latino"
                                              type="checkbox"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Hispanic/Latino"
                                                ) != -1
                                              }
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Indian{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Indian"
                                              type="checkbox"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Indian"
                                                ) != -1
                                              }
                                              id="theirEthnicityIsMostly"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Mixed{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Mixed"
                                              type="checkbox"
                                              id="theirEthnicityIsMostly"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Mixed"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="theirEthnicityIsMostly"
                                              checked={
                                                theirEthnicityIsMostly.indexOf(
                                                  "Other"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="complexion-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingComplexionAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseComplexionAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseComplexionAppearance"
                                    >
                                      <p className="mb-0">Complexion</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseComplexionAppearance"
                                  aria-labelledby="headingComplexionAppearance"
                                  data-parent="#complexion-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="complexion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Fair{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Fair"
                                              type="checkbox"
                                              checked={
                                                complexion.indexOf("Fair") != -1
                                              }
                                              id="complexion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Very Fair
                                            <input
                                              onChange={this.handleChange}
                                              name="Very Fair"
                                              type="checkbox"
                                              checked={
                                                complexion.indexOf(
                                                  "Very Fair"
                                                ) != -1
                                              }
                                              id="complexion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Wheatish{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Wheatish"
                                              type="checkbox"
                                              checked={
                                                complexion.indexOf(
                                                  "Wheatish"
                                                ) != -1
                                              }
                                              id="complexion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Wheatish Brown{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Wheatish Brown"
                                              type="checkbox"
                                              id="complexion"
                                              checked={
                                                complexion.indexOf(
                                                  "Wheatish Brown"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              checked={
                                                complexion.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                              id="complexion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Dark{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Dark"
                                              type="checkbox"
                                              id="complexion"
                                              checked={
                                                complexion.indexOf("Dark") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Light{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Light"
                                              type="checkbox"
                                              id="complexion"
                                              checked={
                                                complexion.indexOf("Light") !=
                                                -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="consider-appearance-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingConsiderAppearance"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseConsiderAppearance"
                                      aria-expanded="true"
                                      aria-controls="collapseConsiderAppearance"
                                    >
                                      <p className="mb-0">
                                        Consider Their Appearance As
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseConsiderAppearance"
                                  aria-labelledby="headingConsiderAppearance"
                                  data-parent="#consider-appearance-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="considerTheirAppearanceAs"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Below Average{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Below Average"
                                              type="checkbox"
                                              checked={
                                                considerTheirAppearanceAs.indexOf(
                                                  "Below Average"
                                                ) != -1
                                              }
                                              id="considerTheirAppearanceAs"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Average{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Average"
                                              type="checkbox"
                                              id="considerTheirAppearanceAs"
                                              checked={
                                                considerTheirAppearanceAs.indexOf(
                                                  "Average"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Attractive
                                            <input
                                              onChange={this.handleChange}
                                              name="Attractive"
                                              type="checkbox"
                                              id="considerTheirAppearanceAs"
                                              checked={
                                                considerTheirAppearanceAs.indexOf(
                                                  "Attractive"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Very Attractive{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Very Attractive"
                                              type="checkbox"
                                              id="considerTheirAppearanceAs"
                                              checked={
                                                considerTheirAppearanceAs.indexOf(
                                                  "Very Attractive"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="hair-color-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingHairColor"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseHairColor"
                                      aria-expanded="true"
                                      aria-controls="collapseHairColor"
                                    >
                                      <p className="mb-0">Hair Color</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseHairColor"
                                  aria-labelledby="headingHairColor"
                                  data-parent="#hair-color-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="hairColor"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Bald / Shaved{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Bald/Shaved"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf(
                                                  "Bald/Shaved"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Black{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Black"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Black") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Blonde{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Blonde"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Blonde") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Brown{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Brown"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Brown") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Other") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Grey / White{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Grey/White"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf(
                                                  "Grey/White"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Light Brown{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Light Brown"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf(
                                                  "Light Brown"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Changes frequently{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Changes frequently"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf(
                                                  "Changes frequently"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Red{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Red"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Red") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Blue{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Blue"
                                              type="checkbox"
                                              id="hairColor"
                                              checked={
                                                hairColor.indexOf("Blue") != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="hair-length-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingHairLength"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseHairLength"
                                      aria-expanded="true"
                                      aria-controls="collapseHairLength"
                                    >
                                      <p className="mb-0">Hair Length</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseHairLength"
                                  aria-labelledby="headingHairLength"
                                  data-parent="#hair-length-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="hairLength"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Bald{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Bald"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Bald") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Bald on Top{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Bald on Top"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf(
                                                  "Bald on Top"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Shaved{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Shaved"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Shaved") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Short{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Short"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Short") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Medium
                                            <input
                                              onChange={this.handleChange}
                                              name="Medium"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Medium") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Long{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Long"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Long") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Changes frequently{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Changes frequently"
                                              type="checkbox"
                                              checked={
                                                hairLength.indexOf(
                                                  "Changes frequently"
                                                ) != -1
                                              }
                                              id="hairLength"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf("Other") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="hairLength"
                                              checked={
                                                hairLength.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="hair-type-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingHairType"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseHairType"
                                      aria-expanded="true"
                                      aria-controls="collapseHairType"
                                    >
                                      <p className="mb-0">Hair Type</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseHairType"
                                  aria-labelledby="headingHairType"
                                  data-parent="#hair-type-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              name="Bald"
                                              type="checkbox"
                                              id="hairType"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Straight{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Straight"
                                              type="checkbox"
                                              id="hairType"
                                              checked={
                                                hairType.indexOf("Straight") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Wavy{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Wavy"
                                              type="checkbox"
                                              id="hairType"
                                              checked={
                                                hairType.indexOf("Wavy") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Curly
                                            <input
                                              onChange={this.handleChange}
                                              name="Curly"
                                              type="checkbox"
                                              id="hairType"
                                              checked={
                                                hairType.indexOf("Curly") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="hairType"
                                              checked={
                                                hairType.indexOf("Other") != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="eye-color-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEyeColor"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEyeColor"
                                    >
                                      <p className="mb-0">Eye Color</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEyeColor"
                                  aria-labelledby="headingEyeColor"
                                  data-parent="#eye-color-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="eyeColor"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Brown{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Brown"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Brown") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Blue{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Blue"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Blue") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Hazel{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Hazel"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Hazel") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Black
                                            <input
                                              onChange={this.handleChange}
                                              name="Black"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Black") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Green{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Green"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Green") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Grey{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Grey"
                                              type="checkbox"
                                              id="eyeColor"
                                              checked={
                                                eyeColor.indexOf("Grey") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              checked={
                                                eyeColor.indexOf("Other") != -1
                                              }
                                              id="eyeColor"
                                            />{" "}
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
                      </div>
                      <div
                        id="eye-wear-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEyeWear"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEyeWear"
                                    >
                                      <p className="mb-0">Eye Wear</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEyeWear"
                                  data-parent="#eye-wear-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="eyeWear"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Contacts{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Contacts"
                                              type="checkbox"
                                              id="eyeWear"
                                              checked={
                                                eyeWear.indexOf("Contacts") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Glasses{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Glasses"
                                              type="checkbox"
                                              id="eyeWear"
                                              checked={
                                                eyeWear.indexOf("Glasses") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="eyeWear"
                                              checked={
                                                eyeWear.indexOf("Other") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="eyeWear"
                                              checked={
                                                eyeWear.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            None{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="None"
                                              type="checkbox"
                                              id="eyeWear"
                                              checked={
                                                eyeWear.indexOf("None") != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="facial-hair-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingFacialHair"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseFacialHair"
                                    >
                                      <p className="mb-0">Facial Hair</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseFacialHair"
                                  data-parent="#facial-hair-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="facialHair"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Clean Shaven{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Clean Shaven"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Clean Shaven"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Sideburns
                                            <input
                                              onChange={this.handleChange}
                                              name="Sideburns"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Sideburns"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Long Beard
                                            <input
                                              onChange={this.handleChange}
                                              name="Long Beard"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Long Beard"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Medium Beard{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Medium Beard"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Medium Beard"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Mustache
                                            <input
                                              onChange={this.handleChange}
                                              name="Mustache"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Mustache"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Goatee{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Goatee"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf("Goatee") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Short Beard{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Short Beard"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf(
                                                  "Short Beard"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="facialHair"
                                              checked={
                                                facialHair.indexOf("Other") !=
                                                -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="physical-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingPhysical"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapsePhysical"
                                    >
                                      <p className="mb-0">
                                        Physical / Health Status
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapsePhysical"
                                  data-parent="#physical-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Normal{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Normal"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Normal"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Minor Health Issues{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Minor Health Issues"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Minor Health Issues"
                                                ) != -1
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Serious Health Issues{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Serious Health Issues"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Serious Health Issues"
                                                ) != -1
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Major Physical Disability{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Major Physical Disability"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Major Physical Disability"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Minor Physical Disability{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Minor Physical Disability"
                                              type="checkbox"
                                              id="physicalAndHealthStatus"
                                              checked={
                                                physicalAndHealthStatus.indexOf(
                                                  "Minor Physical Disability"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="lifestyle-accordion" className="lifestyle-accordian">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <div className="card-header p-0" id="headingLifestyle">
                    <h5 className="mb-0">
                      <a
                        className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                        data-toggle="collapse"
                        data-target="#collapseLifestyle"
                      >
                        <p className="mb-0">Lifestyle</p>
                      </a>
                    </h5>
                  </div>
                  <div
                    className="collapse"
                    id="collapseLifestyle"
                    data-parent="#lifestyle-accordion"
                  >
                    <div className="card-body bg-light">
                      <div id="smoke-accordion" className="lifestyle-accordian">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingSmoke"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseSmoke"
                                    >
                                      <p className="mb-0">Do they smoke?</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseSmoke"
                                  data-parent="#smoke-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="doYouSmoke"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Do smoke{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="DoSmoke"
                                              type="checkbox"
                                              id="doYouSmoke"
                                              checked={
                                                doYouSmoke.indexOf("DoSmoke") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Occasionally smoke{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="OccasionallySmoke"
                                              type="checkbox"
                                              id="doYouSmoke"
                                              checked={
                                                doYouSmoke.indexOf(
                                                  "OccasionallySmoke"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Don't smoke{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="DontSmoke"
                                              type="checkbox"
                                              id="doYouSmoke"
                                              checked={
                                                doYouSmoke.indexOf(
                                                  "DontSmoke"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div id="drink-accordion" className="lifestyle-accordian">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingDrink"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseDrink"
                                    >
                                      <p className="mb-0">Do they drink?</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseDrink"
                                  data-parent="#drink-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="doYouDrink"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Do Drink{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Do drink"
                                              type="checkbox"
                                              id="doYouDrink"
                                              checked={
                                                doYouDrink.indexOf(
                                                  "Do drink"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="doYouDrink"
                                              checked={
                                                doYouDrink.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Occasionally Drink{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Occasionally drink"
                                              type="checkbox"
                                              id="doYouDrink"
                                              checked={
                                                doYouDrink.indexOf(
                                                  "Occasionally drink"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Don't Drink{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Don't drink"
                                              type="checkbox"
                                              id="doYouDrink"
                                              checked={
                                                doYouDrink.indexOf(
                                                  "Don't drink"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="relocate-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingRelocate"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseRelocate"
                                    >
                                      <p className="mb-0">
                                        Willing to relocate?
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseRelocate"
                                  data-parent="#relocate-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="willingToRelocate"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Willing to relocate within my
                                            country{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Willing to relocate within my country"
                                              type="checkbox"
                                              id="willingToRelocate"
                                              checked={
                                                willingToRelocate.indexOf(
                                                  "Willing to relocate within my country"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Not sure about relocating{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Not sure about relocating"
                                              type="checkbox"
                                              id="willingToRelocate"
                                              checked={
                                                willingToRelocate.indexOf(
                                                  "Not sure about relocating"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Willing to relocate to another
                                            country{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Willing to relocate to another country"
                                              type="checkbox"
                                              id="willingToRelocate"
                                              checked={
                                                willingToRelocate.indexOf(
                                                  "Willing to relocate to another country"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Not willing to relocate{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Not willing to relocate"
                                              type="checkbox"
                                              id="willingToRelocate"
                                              checked={
                                                willingToRelocate.indexOf(
                                                  "Not willing to relocate"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="marital-status-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingMaritalStatus"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseMaritalStatus"
                                    >
                                      <p className="mb-0">Marital Status</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseMaritalStatus"
                                  data-parent="#marital-status-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="maritalStatus"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Single{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Single"
                                              type="checkbox"
                                              id="maritalStatus"
                                              checked={
                                                maritalStatus.indexOf(
                                                  "Single"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Separated
                                            <input
                                              onChange={this.handleChange}
                                              name="Separated"
                                              type="checkbox"
                                              id="maritalStatus"
                                              checked={
                                                maritalStatus.indexOf(
                                                  "Separated"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Widowed
                                            <input
                                              onChange={this.handleChange}
                                              name="Widowed"
                                              type="checkbox"
                                              id="maritalStatus"
                                              checked={
                                                maritalStatus.indexOf(
                                                  "Widowed"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Divorced{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Divorced"
                                              type="checkbox"
                                              id="maritalStatus"
                                              checked={
                                                maritalStatus.indexOf(
                                                  "Divorced"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>

                      <div
                        id="children-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingChildren"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseChildren"
                                    >
                                      <p className="mb-0">
                                        Do they have children?
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseChildren"
                                  data-parent="#children-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="doYouHaveChildren"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            No{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="No"
                                              type="checkbox"
                                              id="doYouHaveChildren"
                                              checked={
                                                doYouHaveChildren.indexOf(
                                                  "No"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Yes - live at home{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="YesliveAtHome"
                                              type="checkbox"
                                              id="doYouHaveChildren"
                                              checked={
                                                doYouHaveChildren.indexOf(
                                                  "YesliveAtHome"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Yes - don't live at home{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="YesDontliveAtHome"
                                              type="checkbox"
                                              id="doYouHaveChildren"
                                              checked={
                                                doYouHaveChildren.indexOf(
                                                  "YesDontliveAtHome"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Yes - sometimes live at home{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="YesSometimesLiveAtHome"
                                              type="checkbox"
                                              id="doYouHaveChildren"
                                              checked={
                                                doYouHaveChildren.indexOf(
                                                  "YesSometimesLiveAtHome"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="no-children-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingNoChildren"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseNoChildren"
                                    >
                                      <p className="mb-0">
                                        Number of children (or below)
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseNoChildren"
                                  data-parent="#no-children-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="numberOfChildren"
                                            value={numberOfChildren}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="young-child-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingYoungChild"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseYoungChild"
                                    >
                                      <p className="mb-0">
                                        Youngest child (or above)
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseYoungChild"
                                  data-parent="#young-child-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="youngestChild"
                                            value={youngestChild}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="old-child-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingOldChild"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseOldChild"
                                    >
                                      <p className="mb-0">
                                        Oldest child (or below)
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseOldChild"
                                  data-parent="#old-child-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="oldestChild"
                                            value={oldestChild}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="more-children-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingMoreChildren"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseMoreChildren"
                                    >
                                      <p className="mb-0">
                                        Do they want (more) children?
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseMoreChildren"
                                  data-parent="#more-children-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="wantMoreChild"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Yes{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Yes"
                                              type="checkbox"
                                              id="wantMoreChild"
                                              checked={
                                                wantMoreChild.indexOf("Yes") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            No{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="No"
                                              type="checkbox"
                                              id="wantMoreChild"
                                              checked={
                                                wantMoreChild.indexOf("No") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Not Sure{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="NotSure"
                                              type="checkbox"
                                              id="wantMoreChild"
                                              checked={
                                                wantMoreChild.indexOf(
                                                  "NotSure"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="eat-habits-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEatHabits"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEatHabits"
                                    >
                                      <p className="mb-0">Eating Habits</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEatHabits"
                                  data-parent="#eat-habits-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="eatingHabits"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Halal foods always{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Halal foods always"
                                              type="checkbox"
                                              id="eatingHabits"
                                              checked={
                                                eatingHabits.indexOf(
                                                  "Halal foods always"
                                                ) != -1
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Halal foods when I can{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Halal foods when I can"
                                              type="checkbox"
                                              id="eatingHabits"
                                              checked={
                                                eatingHabits.indexOf(
                                                  "Halal foods when I can"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            No special restrictions{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="No special restrictions"
                                              type="checkbox"
                                              id="eatingHabits"
                                              checked={
                                                eatingHabits.indexOf(
                                                  "No special restrictions"
                                                ) != -1
                                              }
                                            />
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
                      </div>
                      <div
                        id="occupation-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingOccupation"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseOccupation"
                                    >
                                      <p className="mb-0">Occupation</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseOccupation"
                                  data-parent="#occupation-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="occupation"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Domestic Helper{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="DomesticHelper"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "DomesticHelper"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Construction / Trades{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Construction / Trades"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "Construction / Trades"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Transportation
                                            <input
                                              onChange={this.handleChange}
                                              name="Transportation"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "Transportation"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Sales / Marketing{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Sales / Marketing"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "Sales / Marketing"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Advertising / Media{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Advertising / Media"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "Advertising / Media"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Artistic / Creative / Performance{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Artistic / Creative / Performance"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf(
                                                  "Artistic / Creative / Performance"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Student{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Student"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf("Student") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="occupation"
                                              checked={
                                                occupation.indexOf("Other") !=
                                                -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="employment-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEmployment"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEmployment"
                                    >
                                      <p className="mb-0">Employment Status</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEmployment"
                                  data-parent="#employment-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="employmentStatus"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Student{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Student"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Student"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Part Time
                                            <input
                                              onChange={this.handleChange}
                                              name="Part Time"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Part Time"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Full Time
                                            <input
                                              onChange={this.handleChange}
                                              name="Full Time"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Full Time"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Homemaker
                                            <input
                                              onChange={this.handleChange}
                                              name="Homemaker"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Homemaker"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Retired{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Retired"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Retired"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Not Employed{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Not Employed"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Not Employed"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="employmentStatus"
                                              checked={
                                                employmentStatus.indexOf(
                                                  "Other"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="income-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingIncome"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseIncome"
                                    >
                                      <p className="mb-0">Income (or above)</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseIncome"
                                  data-parent="#income-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="annualIncome"
                                            value={annualIncome}
                                            onChange={this.handleChange}
                                          >
                                            <option value="">Any</option>
                                            <option>
                                              Rs0 - Rs75,000 (INR)
                                            </option>
                                            <option>
                                              Rs75,001 - Rs150,000 (INR)
                                            </option>
                                            <option>
                                              Rs150,001 - Rs300,000 (INR)
                                            </option>
                                            <option>
                                              Rs300,001 - Rs450,000 (INR)
                                            </option>
                                            <option value="5">
                                              Rs450,001 - Rs600,000 (INR)
                                            </option>
                                            <option value="6">
                                              Rs600,001 - Rs1,500,000+ (INR)
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="home-type-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingHomeType"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseHomeType"
                                    >
                                      <p className="mb-0">Home Type</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseHomeType"
                                  data-parent="#home-type-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="homeType"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Apartment / Flat{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Apartment/Flat"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf(
                                                  "Apartment/Flat"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Condominium
                                            <input
                                              onChange={this.handleChange}
                                              name="Condominium"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf(
                                                  "Condominium"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Farm{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Farm"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf("Farm") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            House
                                            <input
                                              onChange={this.handleChange}
                                              name="House"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf("House") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Town house
                                            <input
                                              onChange={this.handleChange}
                                              name="TownHouse"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf("TownHouse") !=
                                                -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf("Other") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="PreferNotToSay"
                                              type="checkbox"
                                              id="homeType"
                                              checked={
                                                homeType.indexOf(
                                                  "PreferNotToSay"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="living-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingLiving"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseLiving"
                                    >
                                      <p className="mb-0">Living Situation</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseLiving"
                                  data-parent="#living-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="livingSituation"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Live Alone
                                            <input
                                              onChange={this.handleChange}
                                              name="Live Alone"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Live Alone"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Live with friends{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Live with friends"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Live with friends"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Live with family{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Live with family"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Live with family"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Live with kids{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Live with kids"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Live with kids"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Live with spouse{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Live with spouse"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Live with spouse"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Other"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="livingSituation"
                                              checked={
                                                livingSituation.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="residency-status-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingResidencyStatus"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseResidencyStatus"
                                    >
                                      <p className="mb-0">Residency Status</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseResidencyStatus"
                                  data-parent="#residency-status-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="residencyStatus"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Citizen{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Citizen"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Citizen"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Permanent Resident{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Permanent Resident"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Permanent Resident"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Work Permit{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Work Permit"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Work Permit"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Student Visa{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Student Visa"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Student Visa"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Temporary Visa{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Temporary Visa"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Temporary Visa"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="residencyStatus"
                                              checked={
                                                residencyStatus.indexOf(
                                                  "Other"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="background-accordion" className="lifestyle-accordian">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <div className="card-header p-0" id="headingBackground">
                    <h5 className="mb-0">
                      <a
                        className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                        data-toggle="collapse"
                        data-target="#collapseBackground"
                      >
                        <p className="mb-0">Background</p>
                      </a>
                    </h5>
                  </div>
                  <div
                    className="collapse"
                    id="collapseBackground"
                    data-parent="#background-accordion"
                  >
                    <div className="card-body bg-light">
                      <div
                        id="nationality-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingNationality"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseNationality"
                                    >
                                      <p className="mb-0">Nationality</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseNationality"
                                  data-parent="#nationality-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <select
                                            className="form-control mb-0"
                                            name="nationality"
                                            value={nationality}
                                            onChange={this.handleChange}
                                          >
                                            <option>Any</option>
                                            <option>Afghanistan</option>
                                            <option>Albania</option>
                                            <option>Argentina</option>
                                            <option>Bahrain</option>
                                            <option>Belize</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="education-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingEducation"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseEducation"
                                    >
                                      <p className="mb-0">
                                        Education (or above)
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseEducation"
                                  data-parent="#education-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check card-body p-3">
                                          <label className="radio-label">
                                            Any{" "}
                                            <input
                                              onChange={this.handleChange}
                                              type="radio"
                                              id="education"
                                              value="Any"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="radio-label">
                                            Primary (Elementary) School{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="education"
                                              type="radio"
                                              id="education"
                                              value="Primary (Elementary) School"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="radio-label">
                                            Middle School / Junior High{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="education"
                                              type="radio"
                                              id="education"
                                              value="Middle School / Junior High"
                                              checked={
                                                education ===
                                                "Middle School / Junior High"
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check card-body p-3">
                                          <label className="radio-label">
                                            High School{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="education"
                                              type="radio"
                                              id="education"
                                              value="High School"
                                              checked={
                                                education === "High School"
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="radio-label">
                                            Vocational College{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="education"
                                              type="radio"
                                              id="education"
                                              value="Vocational College"
                                              checked={
                                                education ===
                                                "Vocational College"
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="radio-label">
                                            Masters Degree{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="education"
                                              type="radio"
                                              id="education"
                                              value="Masters Degree"
                                              checked={
                                                education === "Masters Degree"
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="languages-spoken-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingLanguagesSpoken"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseLanguagesSpoken"
                                    >
                                      <p className="mb-0">Languages Spoken</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseLanguagesSpoken"
                                  data-parent="#languages-spoken-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <Multiselect
                                            classNameName="select2-languages-spoken form-group"
                                            options={this.state.options}
                                            selectedValues={languageSpoken}
                                            onSelect={this.onSelect}
                                            onRemove={this.onRemove}
                                            displayValue="name"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="religion-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingReligion"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseReligion"
                                    >
                                      <p className="mb-0">Religion</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseReligion"
                                  data-parent="#religion-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="religion"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Islam - Sunni{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Islam - Sunni"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf(
                                                  "Islam - Sunni"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Islam - Shiite{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Islam - Shiite"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf(
                                                  "Islam - Shiite"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Willing to revert{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Willing to revert"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf(
                                                  "Willing to revert"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Islam - Sufism{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Islam - Sufism"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf(
                                                  "Islam - Sufism"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Islam - Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Islam - Other"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf(
                                                  "Islam - Other"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Other{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Other"
                                              type="checkbox"
                                              id="religion"
                                              checked={
                                                religion.indexOf("Other") != -1
                                              }
                                            />{" "}
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
                      </div>

                      <div id="born-accordion" className="lifestyle-accordian">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingBorn"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseBorn"
                                    >
                                      <p className="mb-0">Born / Reverted</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseBorn"
                                  data-parent="#born-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="bornReverted"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Born a muslim{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Born a muslim"
                                              type="checkbox"
                                              id="bornReverted"
                                              checked={
                                                bornReverted.indexOf(
                                                  "Born a muslim"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Reverted to Islam{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Reverted to Islam"
                                              type="checkbox"
                                              id="bornReverted"
                                              checked={
                                                bornReverted.indexOf(
                                                  "Reverted to Islam"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Plan to revert to Islam{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Plan to revert to Islam"
                                              type="checkbox"
                                              id="bornReverted"
                                              checked={
                                                bornReverted.indexOf(
                                                  "Plan to revert to Islam"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>

                      <div
                        id="religious-values-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingMoreReligiousValues"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseReligiousValues"
                                    >
                                      <p className="mb-0">Religious Values</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseReligiousValues"
                                  data-parent="#religious-values-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="religiousValue"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Very Religious{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Very Religious"
                                              type="checkbox"
                                              id="religiousValue"
                                              checked={
                                                religiousValue.indexOf(
                                                  "Very Religious"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Religious
                                            <input
                                              onChange={this.handleChange}
                                              name="Religious"
                                              type="checkbox"
                                              id="religiousValue"
                                              checked={
                                                religiousValue.indexOf(
                                                  "Religious"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Not Religious{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Not Religious"
                                              type="checkbox"
                                              id="religiousValue"
                                              checked={
                                                religiousValue.indexOf(
                                                  "Not Religious"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="religious-services-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingReligiousServices"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseReligiousServices"
                                    >
                                      <p className="mb-0">
                                        Attend Religious Services
                                      </p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseReligiousServices"
                                  data-parent="#religious-services-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="attendReligiousService"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Daily{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Daily"
                                              type="checkbox"
                                              id="attendReligiousService"
                                              checked={
                                                attendReligiousService.indexOf(
                                                  "Daily"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Sometimes
                                            <input
                                              onChange={this.handleChange}
                                              name="Sometimes"
                                              type="checkbox"
                                              id="attendReligiousService"
                                              checked={
                                                attendReligiousService.indexOf(
                                                  "Sometimes"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Never
                                            <input
                                              onChange={this.handleChange}
                                              name="Never"
                                              type="checkbox"
                                              id="attendReligiousService"
                                              checked={
                                                attendReligiousService.indexOf(
                                                  "Never"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Only on Jummah / Fridays{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Only on Jummah / Fridays"
                                              type="checkbox"
                                              id="attendReligiousService"
                                              checked={
                                                attendReligiousService.indexOf(
                                                  "Only on Jummah / Fridays"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Only During Ramadan{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Only During Ramadan"
                                              type="checkbox"
                                              id="attendReligiousService"
                                              checked={
                                                attendReligiousService.indexOf(
                                                  "Only During Ramadan"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="read-quran-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingReadQuran"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseReadQuran"
                                    >
                                      <p className="mb-0">Read Qur'an</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseReadQuran"
                                  data-parent="#read-quran-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="readQuran"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Daily{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Daily"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf("Daily") != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Ocassionally
                                            <input
                                              onChange={this.handleChange}
                                              name="Ocassionally"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Ocassionally"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Only During Ramadan{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Only During Ramadan"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Only During Ramadan"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Only on Jummah / Fridays{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Only on Jummah / Fridays"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Only on Jummah / Fridays"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Read translated version{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Read translated version"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Read translated version"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Never Read
                                            <input
                                              onChange={this.handleChange}
                                              name="Never Read"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Never Read"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="readQuran"
                                              checked={
                                                readQuran.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="polygamy-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingPolygamy"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapsePolygamy"
                                    >
                                      <p className="mb-0">Polygamy</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapsePolygamy"
                                  data-parent="#polygamy-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="polygamy"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Accept polygamy
                                            <input
                                              onChange={this.handleChange}
                                              name="Accept polygamy"
                                              type="checkbox"
                                              id="polygamy"
                                              checked={
                                                polygamy.indexOf(
                                                  "Accept polygamy"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Maybe accept polygamy{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Maybe accept polygamy"
                                              type="checkbox"
                                              id="polygamy"
                                              checked={
                                                polygamy.indexOf(
                                                  "Maybe accept polygamy"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Don't accept polygamy{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Don't accept polygamy"
                                              type="checkbox"
                                              id="polygamy"
                                              checked={
                                                polygamy.indexOf(
                                                  "Don't accept polygamy"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="family-values-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingFamilyValues"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseFamilyValues"
                                    >
                                      <p className="mb-0">Family Values</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseFamilyValues"
                                  data-parent="#family-values-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="familyValues"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Conservative
                                            <input
                                              onChange={this.handleChange}
                                              name="Conservative"
                                              type="checkbox"
                                              id="familyValues"
                                              checked={
                                                familyValues.indexOf(
                                                  "Conservative"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Prefer not to say{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Prefer not to say"
                                              type="checkbox"
                                              id="familyValues"
                                              checked={
                                                familyValues.indexOf(
                                                  "Prefer not to say"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Moderate
                                            <input
                                              onChange={this.handleChange}
                                              name="Moderate"
                                              type="checkbox"
                                              id="familyValues"
                                              checked={
                                                familyValues.indexOf(
                                                  "Moderate"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Liberal{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Liberal"
                                              type="checkbox"
                                              id="familyValues"
                                              checked={
                                                familyValues.indexOf(
                                                  "Liberal"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                      <div
                        id="profile-creator-accordion"
                        className="lifestyle-accordian"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="text-field">
                              <div className="form-group card border-0">
                                <div
                                  className="card-header p-0"
                                  id="headingProfileCreator"
                                >
                                  <h5 className="mb-0">
                                    <a
                                      className="btn btn-link pd-common py-1 collapsed btn-collapsed"
                                      data-toggle="collapse"
                                      data-target="#collapseProfileCreator"
                                    >
                                      <p className="mb-0">Profile Creator</p>
                                    </a>
                                  </h5>
                                </div>
                                <div
                                  className="collapse"
                                  id="collapseProfileCreator"
                                  data-parent="#profile-creator-accordion"
                                >
                                  <div className="card-body bg-light">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Any
                                            <input
                                              onChange={this.handleChange}
                                              type="checkbox"
                                              id="profileCreator"
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Self{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Self"
                                              type="checkbox"
                                              id="profileCreator"
                                              checked={
                                                profileCreator.indexOf(
                                                  "Self"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Parent{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Parent"
                                              type="checkbox"
                                              id="profileCreator"
                                              checked={
                                                profileCreator.indexOf(
                                                  "Parent"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check">
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Brother / Sister{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Brother / Sister"
                                              type="checkbox"
                                              id="profileCreator"
                                              checked={
                                                profileCreator.indexOf(
                                                  "Brother / Sister"
                                                ) != -1
                                              }
                                            />{" "}
                                            <span className="checkmark"></span>
                                          </label>{" "}
                                          <label className="checkbox-label pl-4 mr-5 pr-5">
                                            Relative{" "}
                                            <input
                                              onChange={this.handleChange}
                                              name="Relative"
                                              type="checkbox"
                                              id="profileCreator"
                                              checked={
                                                profileCreator.indexOf(
                                                  "Relative"
                                                ) != -1
                                              }
                                            />{" "}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <div className="bg-light card-body text-left">
              <h5 className="mb-3 text-color">Saved Search As</h5>
              <textarea
                className="form-control py-0"
                name="savedSearchearchAs"
                value={savedSearchearchAs}
                onChange={this.handleChange}
              ></textarea>
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
    );
  }
}
