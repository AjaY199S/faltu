/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import {
  ERRORMSG,
  ENGLISHSPEAKINGARRAY,
  ISLANDARRAY,
  MIDDLEARRAY,
  NORTHAMERICAARRAY,
  CENTRALARRAY,
  LATINARRAY,
  WESTERNARRAY,
  EASTERNARRAY,
  CARIIBBEANARRAY,
  ASIAARRAY,
  AUSTRALIAARRAY
} from "../../globals/constant"; //to show error msg
import showNotification from "../../services/notificationService"; // to show success notice

export default class MultipleCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleCountry: props.getCountryStore().multipleCountry
        ? props.getCountryStore().multipleCountry
        : false,
      englishSpeaking: props.getCountryStore().englishSpeaking
        ? props.getCountryStore().englishSpeaking
        : false,
      asiaArray: props.getCountryStore().asiaArray
        ? props.getCountryStore().asiaArray
        : [],
      austrailiaNewArray: props.getCountryStore().austrailiaNewArray
        ? props.getCountryStore().austrailiaNewArray
        : [],
      caribbeanArray: props.getCountryStore().caribbeanArray
        ? props.getCountryStore().caribbeanArray
        : [],
      europe1Array: props.getCountryStore().europe1Array
        ? props.getCountryStore().europe1Array
        : [],
      europe2Array: props.getCountryStore().europe2Array
        ? props.getCountryStore().europe2Array
        : [],
      latinAmericaArray: props.getCountryStore().latinAmericaArray
        ? props.getCountryStore().latinAmericaArray
        : [],
      centralAsiaArray: props.getCountryStore().centralAsiaArray
        ? props.getCountryStore().centralAsiaArray
        : [],
      northAmericaArray: props.getCountryStore().northAmericaArray
        ? props.getCountryStore().northAmericaArray
        : [],
      middleEastArray: props.getCountryStore().middleEastArray
        ? props.getCountryStore().middleEastArray
        : [],
      islandArray: props.getCountryStore().islandArray
        ? props.getCountryStore().islandArray
        : [],
      englishSpeakingArray: props.getCountryStore().englishSpeakingArray
        ? props.getCountryStore().englishSpeakingArray
        : [],
      africa: props.getCountryStore().africa
        ? props.getCountryStore().africa
        : false,
      asia: props.getCountryStore().asia ? props.getCountryStore().asia : false,
      austrailiaNew: props.getCountryStore().austrailiaNew
        ? props.getCountryStore().austrailiaNew
        : false,
      caribbean: props.getCountryStore().caribbean
        ? props.getCountryStore().caribbean
        : false,
      europe: props.getCountryStore().europe
        ? props.getCountryStore().europe
        : false,
      europe1: props.getCountryStore().europe1
        ? props.getCountryStore().europe1
        : false,
      europe2: props.getCountryStore().europe2
        ? props.getCountryStore().europe2
        : false,
      latinAmerica: props.getCountryStore().latinAmerica
        ? props.getCountryStore().latinAmerica
        : false,
      middleAndCenter: props.getCountryStore().middleAndCenter
        ? props.getCountryStore().middleAndCenter
        : false,
      middleEast: props.getCountryStore().middleEast
        ? props.getCountryStore().middleEast
        : false,
      centralAsia: props.getCountryStore().centralAsia
        ? props.getCountryStore().centralAsia
        : false,
      northAmerica: props.getCountryStore().northAmerica
        ? props.getCountryStore().northAmerica
        : false,
      island: props.getCountryStore().island
        ? props.getCountryStore().island
        : false
    };
  }

  handleChange = event => {
    if (Array.isArray(this.state[event.target.id])) {
      if (this.state[event.target.id].indexOf(event.target.name) !== -1) {
        this.state[event.target.id].splice(
          this.state[event.target.id].indexOf(event.target.name),
          1
        );
      } else {
        this.state[event.target.id].push(event.target.name);
      }
      this.props.updateCountryStore(
        [event.target.id],
        this.state[event.target.id]
      );
      this.setState({ [event.target.id]: this.state[event.target.id] });
    } else {
      this.props.updateCountryStore([event.target.id], event.target.value);
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  resetCountry = () => {
    this.newObjects = {
      englishSpeaking: false,
      africa: false,
      asia: false,
      austrailiaNew: false,
      caribbean: false,
      europe: false,
      europe1: false,
      europe2: false,
      latinAmerica: false,
      middleAndCenter: false,
      middleEast: false,
      centralAsia: false,
      northAmerica: false,
      island: false,
      multipleCountry: false,
      asiaArray: [],
      austrailiaNewArray: [],
      caribbeanArray: [],
      europe1Array: [],
      europe2Array: [],
      latinAmericaArray: [],
      centralAsiaArray: [],
      northAmericaArray: [],
      middleEastArray: [],
      islandArray: [],
      englishSpeakingArray: []
    };
    for (let i in this.newObjects) {
      this.props.updateCountryStore(i, this.newObjects[i]);
    }
    this.setState(this.newObjects);
  };

  selectAllCountries = event => {
    if (event.target.id && event.target.value === "on") {
      if (event.target.id === "world") {
        let newObject = {
          englishSpeaking: true,
          africa: true,
          asia: true,
          austrailiaNew: true,
          caribbean: true,
          europe: true,
          europe1: true,
          europe2: true,
          latinAmerica: true,
          middleAndCenter: true,
          middleEast: true,
          centralAsia: true,
          northAmerica: true,
          island: true,
          multipleCountry: true,
          asiaArray: ASIAARRAY,
          caribbeanArray: CARIIBBEANARRAY,
          europe1Array: EASTERNARRAY,
          europe2Array: WESTERNARRAY,
          latinAmericaArray: LATINARRAY,
          centralAsiaArray: CENTRALARRAY,
          northAmericaArray: NORTHAMERICAARRAY,
          middleEastArray: MIDDLEARRAY,
          islandArray: ISLANDARRAY,
          englishSpeakingArray: ENGLISHSPEAKINGARRAY,
          austrailiaNewArray: AUSTRALIAARRAY
        };
        for (let i in newObject) {
          this.props.updateCountryStore(i, newObject[i]);
        }
        this.setState(newObject);
      }
      if (event.target.id === "africa") {
        this.props.updateCountryStore("englishSpeaking", true);
        this.props.updateCountryStore(
          "englishSpeakingArray",
          ENGLISHSPEAKINGARRAY
        );
        this.setState({
          englishSpeaking: true,
          englishSpeakingArray: ENGLISHSPEAKINGARRAY
        });
      }
      if (event.target.id === "asia") {
        this.props.updateCountryStore("asia", true);
        this.props.updateCountryStore("asiaArray", ASIAARRAY);
        this.setState({
          asia: true,
          asiaArray: ASIAARRAY
        });
      }
      if (event.target.id === "austrailiaNew") {
        this.props.updateCountryStore("austrailiaNew", true);
        this.props.updateCountryStore("austrailiaNewArray", AUSTRALIAARRAY);
        this.setState({
          austrailiaNew: true,
          austrailiaNewArray: AUSTRALIAARRAY
        });
      }
      if (event.target.id === "europe") {
        this.props.updateCountryStore("europe1", true);
        this.props.updateCountryStore("europe2", true);
        this.props.updateCountryStore("europe1Array", EASTERNARRAY);
        this.props.updateCountryStore("europe2Array", WESTERNARRAY);
        this.setState({
          europe1: true,
          europe2: true,
          europe1Array: EASTERNARRAY,
          europe2Array: WESTERNARRAY
        });
      }
      if (event.target.id === "europe1") {
        this.props.updateCountryStore("europe1", true);
        this.props.updateCountryStore("europe1Array", EASTERNARRAY);
        this.setState({
          europe1: true,
          europe1Array: EASTERNARRAY
        });
      }
      if (event.target.id === "europe2") {
        this.props.updateCountryStore("europe2", true);
        this.props.updateCountryStore("europe2Array", WESTERNARRAY);
        this.setState({
          europe2: true,
          europe2Array: WESTERNARRAY
        });
      }
      if (event.target.id === "latinAmerica") {
        this.props.updateCountryStore("latinAmerica", true);
        this.props.updateCountryStore("latinAmericaArray", LATINARRAY);
        this.setState({
          latinAmerica: true,
          latinAmericaArray: LATINARRAY
        });
      }
      if (event.target.id === "middleAndCenter") {
        this.props.updateCountryStore("middleEast", true);
        this.props.updateCountryStore("centralAsia", true);
        this.props.updateCountryStore("centralAsiaArray", CENTRALARRAY);
        this.props.updateCountryStore("middleEastArray", MIDDLEARRAY);
        this.setState({
          middleEast: true,
          centralAsia: true,
          centralAsiaArray: CENTRALARRAY,
          middleEastArray: MIDDLEARRAY
        });
      }
      if (event.target.id === "centralAsia") {
        this.props.updateCountryStore("centralAsia", true);
        this.props.updateCountryStore("centralAsiaArray", CENTRALARRAY);
        this.setState({
          centralAsia: true,
          centralAsiaArray: CENTRALARRAY
        });
      }
      if (event.target.id === "northAmerica") {
        this.props.updateCountryStore("northAmerica", true);
        this.props.updateCountryStore("northAmericaArray", NORTHAMERICAARRAY);
        this.setState({
          northAmerica: true,
          northAmericaArray: NORTHAMERICAARRAY
        });
      }
      if (event.target.id === "island") {
        this.props.updateCountryStore("island", true);
        this.props.updateCountryStore("islandArray", ISLANDARRAY);
        this.setState({
          island: true,
          islandArray: ISLANDARRAY
        });
      }
      this.props.updateCountryStore({ [event.target.id]: true });
      this.setState({ [event.target.id]: true });
      event.target.value = "off";
    } else {
      if (event.target.id === "world") {
        this.resetCountry();
      }
      if (event.target.id === "africa") {
        this.props.updateCountryStore("englishSpeaking", false);
        this.props.updateCountryStore("englishSpeakingArray", []);

        this.setState({ englishSpeaking: false, englishSpeakingArray: [] });
      }
      if (event.target.id === "austrailiaNew") {
        this.props.updateCountryStore("austrailiaNew", false);
        this.props.updateCountryStore("austrailiaNewArray", []);
        this.setState({
          austrailiaNew: false,
          austrailiaNewArray: []
        });
      }
      if (event.target.id === "asia") {
        this.props.updateCountryStore("asia", false);
        this.props.updateCountryStore("asiaArray", []);
        this.setState({
          asia: false,
          asiaArray: []
        });
      }
      if (event.target.id === "europe") {
        this.props.updateCountryStore("europe1", false);
        this.props.updateCountryStore("europe2", false);
        this.props.updateCountryStore("europe1Array", []);
        this.props.updateCountryStore("europe2Array", []);
        this.setState({
          europe1: false,
          europe2: false,
          europe1Array: [],
          europe2Array: []
        });
      }
      if (event.target.id === "europe1") {
        this.props.updateCountryStore("europe1", false);
        this.props.updateCountryStore("europe1Array", []);
        this.setState({
          europe1: false,
          europe1Array: []
        });
      }
      if (event.target.id === "europe2") {
        this.props.updateCountryStore("europe2", false);
        this.props.updateCountryStore("europe2Array", []);
        this.setState({
          europe2: false,
          europe2Array: []
        });
      }
      if (event.target.id === "latinAmerica") {
        this.props.updateCountryStore("latinAmerica", false);
        this.props.updateCountryStore("latinAmericaArray", []);
        this.setState({
          latinAmerica: false,
          latinAmericaArray: []
        });
      }
      if (event.target.id === "middleAndCenter") {
        this.props.updateCountryStore("middleEast", false);
        this.props.updateCountryStore("centralAsia", false);
        this.props.updateCountryStore("centralAsiaArray", []);
        this.props.updateCountryStore("middleEastArray", []);
        this.setState({
          middleEast: false,
          centralAsia: false,
          centralAsiaArray: [],
          middleEastArray: []
        });
      }
      if (event.target.id === "centralAsia") {
        this.props.updateCountryStore("centralAsia", false);
        this.props.updateCountryStore("centralAsiaArray", []);
        this.setState({
          centralAsia: false,
          centralAsiaArray: []
        });
      }
      if (event.target.id === "northAmerica") {
        this.props.updateCountryStore("northAmerica", false);
        this.props.updateCountryStore("northAmericaArray", []);
        this.setState({
          northAmerica: false,
          northAmericaArray: []
        });
      }
      if (event.target.id === "island") {
        this.props.updateCountryStore("island", false);
        this.props.updateCountryStore("islandArray", []);
        this.setState({
          island: false,
          islandArray: []
        });
      }
      this.props.updateCountryStore({ [event.target.id]: false });
      this.setState({ [event.target.id]: false });
      event.target.value = "on";
    }
  };

  render() {
    const {
      englishSpeaking,
      africa,
      asia,
      austrailiaNew,
      caribbean,
      europe,
      europe1,
      europe2,
      latinAmerica,
      middleEast,
      centralAsia,
      middleAndCenter,
      northAmerica,
      island,
      englishSpeakingArray,
      asiaArray,
      austrailiaNewArray,
      caribbeanArray,
      europe1Array,
      europe2Array,
      latinAmericaArray,
      centralAsiaArray,
      middleEastArray,
      northAmericaArray,
      islandArray,
      multipleCountry
    } = this.state;

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="text-field">
            <div className="form-group card border-0">
              <div className="card-header p-0" id="headingCountries">
                <h5 className="mb-0 form-check d-flex align-items-center">
                  <a
                    className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                    data-toggle="collapse"
                    data-target="#collapseCountries"
                  >
                    {" "}
                  </a>
                  <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                    World
                    <input
                      type="checkbox"
                      checked={multipleCountry}
                      id="world"
                      onChange={this.selectAllCountries}
                      name="World"
                    />{" "}
                    <span className="checkmark"></span>
                  </label>
                </h5>
              </div>
              <div
                className="collapse show"
                id="collapseCountries"
                data-parent="#countries-accordion"
              >
                <div className="card-body bg-light">
                  <div id="world-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div className="card-header p-0" id="headingWorld">
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseWorld"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Africa
                                  <input
                                    type="checkbox"
                                    id="africa"
                                    checked={africa}
                                    onChange={this.selectAllCountries}
                                    name="Africa"
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseWorld"
                              data-parent="#world-accordion"
                            >
                              <div className="card-body bg-light">
                                <div
                                  id="africa-accordion"
                                  className="lifestyle-accordian"
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="text-field">
                                        <div className="form-group card border-0">
                                          <div
                                            className="card-header p-0"
                                            id="headingAfrica"
                                          >
                                            <h5 className="mb-0 form-check d-flex align-items-center">
                                              <a
                                                className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                                data-toggle="collapse"
                                                data-target="#collapseAfrica"
                                              >
                                                {" "}
                                              </a>
                                              <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                                English Speaking{" "}
                                                <input
                                                  type="checkbox"
                                                  id="englishSpeaking"
                                                  checked={englishSpeaking}
                                                  onChange={
                                                    this.selectAllCountries
                                                  }
                                                  name="EnglishSpeaking"
                                                />{" "}
                                                <span className="checkmark"></span>
                                              </label>
                                            </h5>
                                          </div>
                                          <div
                                            className="collapse"
                                            id="collapseAfrica"
                                            data-parent="#africa-accordion"
                                          >
                                            <div className="card-body bg-light">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Botswana
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Botswana"
                                                          ) != -1
                                                        }
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        name="Botswana"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Eritrea
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Eritrea"
                                                          ) != -1
                                                        }
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        name="Eritrea"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Eswatini
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Eswatini"
                                                          ) != -1
                                                        }
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        name="Eswatini"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Ethiopia
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Ethiopia"
                                                          ) != -1
                                                        }
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        name="Ethiopia"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>

                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Gambia
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Gambia"
                                                          ) != -1
                                                        }
                                                        name="Gambia"
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Ghana
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Ghana"
                                                          ) != -1
                                                        }
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        name="Ghana"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Liberia"
                                                          ) != -1
                                                        }
                                                        name="Liberia"
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                      />
                                                      Liberia
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        type="checkbox"
                                                        id="englishSpeakingArray"
                                                        checked={
                                                          englishSpeaking ||
                                                          englishSpeakingArray.indexOf(
                                                            "Tanzania"
                                                          ) != -1
                                                        }
                                                        name="Tanzania"
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                      />
                                                      Tanzania
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
                  <div id="asia-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div className="card-header p-0" id="headingAsia">
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseAsia"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Asia
                                  <input
                                    type="checkbox"
                                    id="asia"
                                    checked={asia}
                                    name="Asia"
                                    onChange={this.selectAllCountries}
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseAsia"
                              data-parent="#asia-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Bangladesh
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Bangladesh") !=
                                              -1
                                          }
                                          name="Bangladesh"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Bhutan
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Bhutan") != -1
                                          }
                                          name="Bhutan"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Brunei
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Brunei") != -1
                                          }
                                          name="Brunei"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Cambodia
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Cambodia") != -1
                                          }
                                          name="Cambodia"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        China
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("China") != -1
                                          }
                                          name="China"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        India
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("India") != -1
                                          }
                                          name="India"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Indonesia") != -1
                                          }
                                          name="Indonesia"
                                          onChange={this.handleChange}
                                        />
                                        Indonesia
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        <input
                                          type="checkbox"
                                          id="asiaArray"
                                          checked={
                                            asia ||
                                            asiaArray.indexOf("Maldives") != -1
                                          }
                                          name="Maldives"
                                          onChange={this.handleChange}
                                        />
                                        Maldives
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
                  <div id="australia-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingAustralia"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseAustralia"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Australia & New Zealand{" "}
                                  <input
                                    type="checkbox"
                                    id="austrailiaNew"
                                    checked={austrailiaNew}
                                    name="Austrailianew"
                                    onChange={this.selectAllCountries}
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseAustralia"
                              data-parent="#australia-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Australia
                                        <input
                                          type="checkbox"
                                          id="austrailiaNewArray"
                                          checked={
                                            austrailiaNew ||
                                            austrailiaNewArray.indexOf(
                                              "austrailia"
                                            ) != -1
                                          }
                                          name="Australia"
                                          onChange={this.handleChange}
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        New Zealand{" "}
                                        <input
                                          type="checkbox"
                                          checked={
                                            austrailiaNew ||
                                            austrailiaNewArray.indexOf(
                                              "newzealand"
                                            ) != -1
                                          }
                                          name="Newzealand"
                                          onChange={this.handleChange}
                                          id="austrailiaNewArray"
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
                  <div id="caribbean-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingCaribbean"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseCaribbean"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Caribbean
                                  <input
                                    type="checkbox"
                                    id="caribbean"
                                    checked={caribbean}
                                    name="Caribbean"
                                    onChange={this.selectAllCountries}
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseCaribbean"
                              data-parent="#caribbean-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Anguilla
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf(
                                              "Anguilla"
                                            ) != -1
                                          }
                                          type="checkbox"
                                          onChange={this.handleChange}
                                          name="Anguilla"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Antigua and Barbuda{" "}
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf(
                                              "antihuandbarbuda"
                                            ) != -1
                                          }
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Antihuandbarbuda"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Aruba
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf("Aruba") !=
                                              -1
                                          }
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Aruba"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Bahamas
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf("Bahamas") !=
                                              -1
                                          }
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Bahamas"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Barbados
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf(
                                              "Barbados"
                                            ) != -1
                                          }
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Barbados"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Belize
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf("Belize") !=
                                              -1
                                          }
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Belize"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Guyana
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf("Guyana") !=
                                              -1
                                          }
                                          onChange={this.handleChange}
                                          name="Guyana"
                                          type="checkbox"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Jamaica
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf("Jamaica") !=
                                              -1
                                          }
                                          onChange={this.handleChange}
                                          name="Jamaica"
                                          type="checkbox"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Sint Maarten{" "}
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf(
                                              "sintMaarten"
                                            ) != -1
                                          }
                                          onChange={this.handleChange}
                                          name="SintMaarten"
                                          type="checkbox"
                                          id="caribbeanArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Virgin Islands (US){" "}
                                        <input
                                          checked={
                                            caribbean ||
                                            caribbeanArray.indexOf(
                                              "virginIsland"
                                            ) != -1
                                          }
                                          onChange={this.handleChange}
                                          name="VirginIsland"
                                          type="checkbox"
                                          id="caribbeanArray"
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
                  <div id="europe-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div className="card-header p-0" id="headingEurope">
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseEurope"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Europe
                                  <input
                                    onChange={this.selectAllCountries}
                                    type="checkbox"
                                    name="Europe"
                                    checked={europe}
                                    id="europe"
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseEurope"
                              data-parent="#europe-accordion"
                            >
                              <div className="card-body bg-light">
                                <div
                                  id="eastern-europe-accordion"
                                  className="lifestyle-accordian"
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="text-field">
                                        <div className="form-group card border-0">
                                          <div
                                            className="card-header p-0"
                                            id="headingEasternEurope"
                                          >
                                            <h5 className="mb-0 form-check d-flex align-items-center">
                                              <a
                                                className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                                data-toggle="collapse"
                                                data-target="#collapseEasternEurope"
                                              ></a>{" "}
                                              <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                                Eastern Europe{" "}
                                                <input
                                                  type="checkbox"
                                                  onChange={
                                                    this.selectAllCountries
                                                  }
                                                  checked={europe1}
                                                  name="Europe1"
                                                  id="europe1"
                                                />{" "}
                                                <span className="checkmark"></span>
                                              </label>
                                            </h5>
                                          </div>
                                          <div
                                            className="collapse"
                                            id="collapseEasternEurope"
                                            data-parent="#eastern-europe-accordion"
                                          >
                                            <div className="card-body bg-light">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Albania
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Albania"
                                                          ) != -1
                                                        }
                                                        name="Albania"
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Armenia
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Armenia"
                                                          ) != -1
                                                        }
                                                        name="Armenia"
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Croatia
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        name="Croatia"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Croatia"
                                                          ) != -1
                                                        }
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Poland
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Poland"
                                                          ) != -1
                                                        }
                                                        name="Poland"
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>

                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Slovakia
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Slovakia"
                                                          ) != -1
                                                        }
                                                        name="Slovakia"
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Slovenia
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        name="Slovenia"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Slovenia"
                                                          ) != -1
                                                        }
                                                        id="europe1Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        name="Ukraine"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Ukraine"
                                                          ) != -1
                                                        }
                                                        id="europe1Array"
                                                      />
                                                      Ukraine
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        name="Moldova"
                                                        checked={
                                                          europe1 ||
                                                          europe1Array.indexOf(
                                                            "Moldova"
                                                          ) != -1
                                                        }
                                                        id="europe1Array"
                                                      />
                                                      Moldova
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
                                  id="western-europe-accordion"
                                  className="lifestyle-accordian"
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="text-field">
                                        <div className="form-group card border-0">
                                          <div
                                            className="card-header p-0"
                                            id="headingWesternEurope"
                                          >
                                            <h5 className="mb-0 form-check d-flex align-items-center">
                                              <a
                                                className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                                data-toggle="collapse"
                                                data-target="#collapseWesternEurope"
                                              ></a>{" "}
                                              <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                                Western Europe{" "}
                                                <input
                                                  onChange={
                                                    this.selectAllCountries
                                                  }
                                                  type="checkbox"
                                                  checked={europe2}
                                                  name="Europe2"
                                                  id="europe2"
                                                />{" "}
                                                <span className="checkmark"></span>
                                              </label>
                                            </h5>
                                          </div>
                                          <div
                                            className="collapse"
                                            id="collapseWesternEurope"
                                            data-parent="#western-europe-accordion"
                                          >
                                            <div className="card-body bg-light">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Åland Islands{" "}
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "alandIsland"
                                                          ) != -1
                                                        }
                                                        name="AlandIsland"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Andorra
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Andorra"
                                                          ) != -1
                                                        }
                                                        name="Andorra"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Belgium
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Belgium"
                                                          ) != -1
                                                        }
                                                        name="Belgium"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Estonia
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Estonia"
                                                          ) != -1
                                                        }
                                                        name="Estonia"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>

                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Finland
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Finland"
                                                          ) != -1
                                                        }
                                                        name="Finland"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Greece
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Greece"
                                                          ) != -1
                                                        }
                                                        name="Greece"
                                                        id="europe2Array"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Ireland"
                                                          ) != -1
                                                        }
                                                        name="Ireland"
                                                        id="europe2Array"
                                                      />
                                                      Ireland
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          europe2 ||
                                                          europe2Array.indexOf(
                                                            "Liechtenstein"
                                                          ) != -1
                                                        }
                                                        name="Liechtenstein"
                                                        id="europe2Array"
                                                      />
                                                      Liechtenstein
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
                  <div
                    id="latin-america-accordion"
                    className="lifestyle-accordian"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingLatinAmerica"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseLatinAmerica"
                                >
                                  {" "}
                                </a>
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Latin America{" "}
                                  <input
                                    onChange={this.selectAllCountries}
                                    type="checkbox"
                                    checked={latinAmerica}
                                    id="latinAmerica"
                                    name="LatinAmerica"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseLatinAmerica"
                              data-parent="#latin-america-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Argentina
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "Argentina"
                                            ) != -1
                                          }
                                          name="Argentina"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Brazil and Barbuda{" "}
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="BrazilandBarbuda"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "BrazilandBarbuda"
                                            ) != -1
                                          }
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Chile
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "Chile"
                                            ) != -1
                                          }
                                          name="Chile"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Costa Rica{" "}
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "CostaRica"
                                            ) != -1
                                          }
                                          name="CostaRica"
                                          id="latinAmericaArray"
                                        />
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Dominican Republic{" "}
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "DominicaRebublic"
                                            ) != -1
                                          }
                                          name="DominicaRebublic"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Guatemala
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "Guatemala"
                                            ) != -1
                                          }
                                          name="Guatemala"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Paraguay
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "Paraguay"
                                            ) != -1
                                          }
                                          name="Paraguay"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Uruguay
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          name="Uruguay"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "Uruguay"
                                            ) != -1
                                          }
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Paraguay Maarten{" "}
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "ParaguayMaarten"
                                            ) != -1
                                          }
                                          name="ParaguayMaarten"
                                          id="latinAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Mexico Islands (US){" "}
                                        <input
                                          onChange={this.handleChange}
                                          name="MexicoIslands"
                                          type="checkbox"
                                          checked={
                                            latinAmerica ||
                                            latinAmericaArray.indexOf(
                                              "MexicoIslands"
                                            ) != -1
                                          }
                                          id="latinAmericaArray"
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
                  <div id="east-asia-accordion" className="lifestyle-accordian">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingEastAsia"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseEastAsia"
                                >
                                  {" "}
                                </a>{" "}
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Middle East and Central Asia{" "}
                                  <input
                                    onChange={this.selectAllCountries}
                                    type="checkbox"
                                    id="middleAndCenter"
                                    checked={middleAndCenter}
                                    name="MiddleAndCenter"
                                  />{" "}
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseEastAsia"
                              data-parent="#east-asia-accordion"
                            >
                              <div className="card-body bg-light">
                                <div
                                  id="central-asia-accordion"
                                  className="lifestyle-accordian"
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="text-field">
                                        <div className="form-group card border-0">
                                          <div
                                            className="card-header p-0"
                                            id="headingCentralAsia"
                                          >
                                            <h5 className="mb-0 form-check d-flex align-items-center">
                                              <a
                                                className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                                data-toggle="collapse"
                                                data-target="#collapseCentralAsia"
                                              ></a>{" "}
                                              <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                                Central Asia{" "}
                                                <input
                                                  onChange={
                                                    this.selectAllCountries
                                                  }
                                                  type="checkbox"
                                                  checked={centralAsia}
                                                  name="CentralAsia"
                                                  id="centralAsia"
                                                />{" "}
                                                <span className="checkmark"></span>
                                              </label>
                                            </h5>
                                          </div>
                                          <div
                                            className="collapse"
                                            id="collapseCentralAsia"
                                            data-parent="#central-asia-accordion"
                                          >
                                            <div className="card-body bg-light">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Afghanistan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Afghanistan"
                                                          ) != -1
                                                        }
                                                        name="Afghanistan"
                                                        id="centralAsiaArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Azerbaijan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Azerbaijan"
                                                          ) != -1
                                                        }
                                                        name="Azerbaijan"
                                                        id="centralAsiaArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Kazakhstan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Kazakhstan"
                                                          ) != -1
                                                        }
                                                        name="Kazakhstan"
                                                        id="centralAsiaArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>

                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Uzbekistan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Uzbekistan"
                                                          ) != -1
                                                        }
                                                        name="Uzbekistan"
                                                        id="centralAsiaArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Tajikistan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Tajikistan"
                                                          ) != -1
                                                        }
                                                        name="Tajikistan"
                                                        id="centralAsiaArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Turkmenistan
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          centralAsia ||
                                                          centralAsiaArray.indexOf(
                                                            "Turkmenistan"
                                                          ) != -1
                                                        }
                                                        name="Turkmenistan"
                                                        id="centralAsiaArray"
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
                                  id="middle-east-accordion"
                                  className="lifestyle-accordian"
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="text-field">
                                        <div className="form-group card border-0">
                                          <div
                                            className="card-header p-0"
                                            id="headingMiddleEast"
                                          >
                                            <h5 className="mb-0 form-check d-flex align-items-center">
                                              <a
                                                className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                                data-toggle="collapse"
                                                data-target="#collapseMiddleEast"
                                              ></a>{" "}
                                              <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                                Middle East{" "}
                                                <input
                                                  onChange={
                                                    this.selectAllCountries
                                                  }
                                                  type="checkbox"
                                                  checked={middleEast}
                                                  name="MiddleEast"
                                                  id="middleEast"
                                                />{" "}
                                                <span className="checkmark"></span>
                                              </label>
                                            </h5>
                                          </div>
                                          <div
                                            className="collapse"
                                            id="collapseMiddleEast"
                                            data-parent="#middle-east-accordion"
                                          >
                                            <div className="card-body bg-light">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Bahrain Islands{" "}
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "BahrainIsland"
                                                          ) != -1
                                                        }
                                                        name="BahrainIsland"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Iraq
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Iraq"
                                                          ) != -1
                                                        }
                                                        name="Iraq"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Israel
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Israel"
                                                          ) != -1
                                                        }
                                                        name="Israel"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Kuwait
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Kuwait"
                                                          ) != -1
                                                        }
                                                        name="Kuwait"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>

                                                <div className="col-md-6">
                                                  <div className="form-check">
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Qatar
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Qatar"
                                                          ) != -1
                                                        }
                                                        name="Qatar"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      Syria
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Syria"
                                                          ) != -1
                                                        }
                                                        name="Syria"
                                                        id="middleEastArray"
                                                      />{" "}
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Turkey"
                                                          ) != -1
                                                        }
                                                        name="Turkey"
                                                        id="middleEastArray"
                                                      />
                                                      Turkey
                                                      <span className="checkmark"></span>
                                                    </label>{" "}
                                                    <label className="checkbox-label pl-4 mr-5 pr-5">
                                                      <input
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                        type="checkbox"
                                                        checked={
                                                          middleEast ||
                                                          middleEastArray.indexOf(
                                                            "Yemen"
                                                          ) != -1
                                                        }
                                                        name="Yemen"
                                                        id="middleEastArray"
                                                      />
                                                      Yemen
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
                  <div
                    id="north-america-accordion"
                    className="lifestyle-accordian"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingNorthAmerica"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapseNorthAmerica"
                                >
                                  {" "}
                                </a>
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  North America{" "}
                                  <input
                                    onChange={this.selectAllCountries}
                                    name="NorthAmerica"
                                    type="checkbox"
                                    checked={northAmerica}
                                    id="northAmerica"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapseNorthAmerica"
                              data-parent="#north-america-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Canada
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            northAmerica ||
                                            northAmericaArray.indexOf(
                                              "Canada"
                                            ) != -1
                                          }
                                          name="Canada"
                                          id="northAmericaArray"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        United States{" "}
                                        <input
                                          onChange={this.handleChange}
                                          name="UnitedStates"
                                          type="checkbox"
                                          checked={
                                            northAmerica ||
                                            northAmericaArray.indexOf(
                                              "UnitedStates"
                                            ) != -1
                                          }
                                          id="northAmericaArray"
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
                    id="pacific-islands-accordion"
                    className="lifestyle-accordian"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="text-field">
                          <div className="form-group card border-0">
                            <div
                              className="card-header p-0"
                              id="headingPacificIslands"
                            >
                              <h5 className="mb-0 form-check d-flex align-items-center">
                                <a
                                  className="btn btn-link pd-common py-1 collapsed btn-collapsed pr-0"
                                  data-toggle="collapse"
                                  data-target="#collapsePacificIslands"
                                >
                                  {" "}
                                </a>
                                <label className="checkbox-label pl-3 mr-5 pr-3 mb-0">
                                  Pacific Islands{" "}
                                  <input
                                    onChange={this.selectAllCountries}
                                    name="Island"
                                    type="checkbox"
                                    checked={island}
                                    id="island"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </h5>
                            </div>
                            <div
                              className="collapse"
                              id="collapsePacificIslands"
                              data-parent="#pacific-islands-accordion"
                            >
                              <div className="card-body bg-light">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Fiji
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Fiji") != -1
                                          }
                                          id="islandArray"
                                          name="Fiji"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Kiribati
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Kiribati") !=
                                              -1
                                          }
                                          id="islandArray"
                                          name="Kiribati"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Micronesia
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Micronesia") !=
                                              -1
                                          }
                                          id="islandArray"
                                          name="Micronesia"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Nauru
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Nauru") != -1
                                          }
                                          id="islandArray"
                                          name="Nauru"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Palau
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Palau") != -1
                                          }
                                          id="islandArray"
                                          name="Palau"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-check">
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        American Samoa{" "}
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf(
                                              "AsmericaSamoa"
                                            ) != -1
                                          }
                                          id="islandArray"
                                          name="AmericaSamoa"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Samoa
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Samoa") != -1
                                          }
                                          id="islandArray"
                                          name="Samoa"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Tokelau
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Tokelau") != -1
                                          }
                                          id="islandArray"
                                          name="Tokelau"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Tuvalu
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Tuvalu") != -1
                                          }
                                          id="islandArray"
                                          name="Tuvalu"
                                        />{" "}
                                        <span className="checkmark"></span>
                                      </label>{" "}
                                      <label className="checkbox-label pl-4 mr-5 pr-5">
                                        Vanuatu
                                        <input
                                          onChange={this.handleChange}
                                          type="checkbox"
                                          checked={
                                            island ||
                                            islandArray.indexOf("Vanuatu") != -1
                                          }
                                          id="islandArray"
                                          name="Vanuatu"
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
    );
  }
}
