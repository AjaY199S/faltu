/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import { ERRORMSG } from "../../globals/constant";
import showNotification from "../../services/notificationService";

export default class Hobbies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbiesInterest: [],
      musicLike: [],
      foodLike: [],
      sports: []
    };
  }
  componentWillMount = async () => {
    await UserService.getUserHobbies()
      .then(response => {
        let responseData = response.data;
        if (responseData.success === true) {
          this.setState(responseData.data);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  handleCheck = event => {
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
      this.setState({ [event.target.name]: event.target.value }, () => {});
    }
  };

  submitHandle = async () => {
    await UserService.updateHobbies(this.state)
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
    const { foodLike, musicLike, hobbiesInterest, sports } = this.state;
    return (
      <div
        className="tab-pane fade show active"
        id="v-pills-hobby"
        role="tabpanel"
        aria-labelledby="v-pills-hobby-tab"
      >
        <form>
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">
              Hobbies & Interest
            </h3>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What are your hobbies and interest?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Antiques
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Antiques"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Antiques") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Board/Card Games
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Board/CardGames"
                              value
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Board/CardGames") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Cars/mechanic
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Cars/mechanic"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Cars/mechanic") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Collecting
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Collecting"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Collecting") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Social media
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Socialmedia"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Socialmedia") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Parties
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Parties"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Parties") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Family
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Family"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Family") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Investing/finance
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Investing/finance"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Investing/finance") !=
                                -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Gardening/landscaping
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Gardening/landscaping"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf(
                                  "Gardening/landscaping"
                                ) != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Art/painting
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Art/painting"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Art/painting") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Ballet
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Ballet"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Ballet") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Beach/park
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Beach/park"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Beach/park") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Camping/Nature
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Camping/Nature"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Camping/Nature") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Casino
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Casino"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Casino") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Comedy Club
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="ComedyClub"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("ComedyClub") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Music
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Music"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Music") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Dining Out
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="DiningOut"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("DiningOut") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Education
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Education"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Education") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Fashion
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Fashion"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Fashion") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Galleries
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Galleries"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Galleries") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Crafts
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Crafts"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Crafts") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Internet Games
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="InternetGames"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("InternetGames") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Video Games
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="VideoGames"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("VideoGames") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Computer/Internet
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Computer/Internet"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Computer/Internet") !=
                                -1
                              }
                            ></input>
                            <span
                              lifestyle-accordian=""
                              className="checkmark"
                            ></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Cooking/foods
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Cooking/foods"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Cooking/foods") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Dancing
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Dancing"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Dancing") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Reading
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Reading"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Reading") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Shopping
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Shopping"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Shopping") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Watching TV
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="WatchingTV"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("WatchingTV") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Theatre
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Theatre"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Theatre") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Sing
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Sing"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Sing") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Meditation
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Meditation"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Meditation") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Philosophy
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Philosophy"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Philosophy") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            News
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="News"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("News") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Movie
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Movie"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Movie") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Travelling
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Travelling"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Travelling") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Volunteering
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Volunteering"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Volunteering") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Writing
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Writing"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Writing") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Science
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Science"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Science") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Technology
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Technology"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("Technology") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Home Improvement
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="HomeImprovement"
                              onChange={this.handleCheck}
                              checked={
                                hobbiesInterest.indexOf("HomeImprovement") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Others
                            <input
                              type="checkbox"
                              id="hobbiesInterest"
                              name="Others"
                              onChange={this.handleCheck}
                              checked={hobbiesInterest.indexOf("Others") != -1}
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
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Do you listen to music?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="form-check">
                      <div className="row">
                        <div className="col-md-6">
                          <div
                            id="listen-nested-accordion"
                            className="lifestyle-accordian"
                          >
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="text-field">
                                  <div className="form-group card border-0 bg-transparent">
                                    <div className="p-0">
                                      <a className="btn py-1">
                                        <label
                                          className="radio-label m-0"
                                          id="headingListenNested"
                                        >
                                          Yes
                                          <input
                                            type="radio"
                                            name="abc"
                                            id="yes"
                                            checked={musicLike.length}
                                            onChange={this.handleCheck}
                                            data-toggle="collapse"
                                            data-target="#collapseListenNested"
                                          ></input>
                                          <span className="checkmark"></span>
                                        </label>
                                      </a>
                                    </div>
                                    <div
                                      className="collapse"
                                      id="collapseListenNested"
                                      data-parent="#listen-nested-accordion"
                                    >
                                      <div className="card-body bg-white">
                                        <div className="form-check">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <label className="checkbox-label pl-4 mr-5 pr-5">
                                                Modern
                                                <input
                                                  name="Modern"
                                                  type="checkbox"
                                                  id="musicLike"
                                                  value="Modern"
                                                  onChange={this.handleCheck}
                                                  checked={
                                                    musicLike.indexOf(
                                                      "Modern"
                                                    ) != -1
                                                  }
                                                ></input>
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="checkbox-label pl-4 mr-5 pr-5">
                                                classNameic
                                                <input
                                                  name="classNameic"
                                                  type="checkbox"
                                                  id="musicLike"
                                                  onChange={this.handleCheck}
                                                  checked={
                                                    musicLike.indexOf(
                                                      "classNameic"
                                                    ) != -1
                                                  }
                                                ></input>
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="checkbox-label pl-4 mr-5 pr-5">
                                                Traditional
                                                <input
                                                  name="Traditional"
                                                  type="checkbox"
                                                  id="musicLike"
                                                  onChange={this.handleCheck}
                                                  checked={
                                                    musicLike.indexOf(
                                                      "Traditional"
                                                    ) != -1
                                                  }
                                                ></input>
                                                <span className="checkmark"></span>
                                              </label>
                                            </div>
                                            <div className="col-md-6">
                                              <label className="checkbox-label pl-4 mr-5 pr-5">
                                                Religious
                                                <input
                                                  name="Religious"
                                                  type="checkbox"
                                                  id="musicLike"
                                                  onChange={this.handleCheck}
                                                  checked={
                                                    musicLike.indexOf(
                                                      "Religious"
                                                    ) != -1
                                                  }
                                                ></input>
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="checkbox-label pl-4 mr-5 pr-5">
                                                Others
                                                <input
                                                  name="Others"
                                                  type="checkbox"
                                                  id="musicLike"
                                                  onChange={this.handleCheck}
                                                  checked={
                                                    musicLike.indexOf(
                                                      "Others"
                                                    ) != -1
                                                  }
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
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="radio-label m-0">
                            No
                            <input
                              id="no"
                              type="radio"
                              name="abc"
                              checked={!musicLike.length}
                              onChange={this.handleCheck}
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

          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What of sort of food do you like?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            American
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="American"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("American") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Southern
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Southern"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Southern") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Caribbean
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Caribbean"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Caribbean") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Continental
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Continental"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Continental") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Mediterranean media
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Mediterraneanmedia"
                              onChange={this.handleCheck}
                              checked={
                                foodLike.indexOf("Mediterraneanmedia") != -1
                              }
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Middle Eastern
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="MiddleEastern"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("MiddleEastern") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Mexican
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Mexican"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Mexican") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Asian
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Asian"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Asian") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Japanese
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Japanese"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Japanese") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Korean
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Korean"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Korean") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Vegetarian
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Vegetarian"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Vegetarian") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Chinese
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Chinese"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Chinese") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Indian
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Indian"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Indian") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Seafood
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Seafood"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Seafood") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Others
                            <input
                              type="checkbox"
                              id="foodLike"
                              name="Others"
                              onChange={this.handleCheck}
                              checked={foodLike.indexOf("Others") != -1}
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
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What sport do you play or watch?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Aerobic
                            <input
                              type="checkbox"
                              id="sports"
                              name="Aerobic"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Aerobic") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Golf
                            <input
                              type="checkbox"
                              id="sports"
                              name="Golf"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Golf") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Cricket
                            <input
                              type="checkbox"
                              id="sports"
                              name="Cricket"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Cricket") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Soccer
                            <input
                              type="checkbox"
                              id="sports"
                              name="Soccer"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Soccer") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Tennis media
                            <input
                              type="checkbox"
                              id="sports"
                              name="Tennismedia"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Tennismedia") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Billiard Eastern
                            <input
                              type="checkbox"
                              id="sports"
                              name="BilliardEastern"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("BilliardEastern") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Fishing
                            <input
                              type="checkbox"
                              id="sports"
                              name="Fishing"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Fishing") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Cycling
                            <input
                              type="checkbox"
                              id="sports"
                              name="Cycling"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Cycling") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Gym
                            <input
                              type="checkbox"
                              id="sports"
                              name="Gym"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Gym") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Martial Art
                            <input
                              type="checkbox"
                              id="sports"
                              name="MartialArt"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("MartialArt") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Surfing
                            <input
                              type="checkbox"
                              id="sports"
                              name="Surfing"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Surfing") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Horse Riding
                            <input
                              type="checkbox"
                              id="sports"
                              name="HorseRiding"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("HorseRiding") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Archery
                            <input
                              type="checkbox"
                              id="sports"
                              name="Archery"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Archery") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Swimming
                            <input
                              type="checkbox"
                              id="sports"
                              name="Swimming"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Swimming") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Running
                            <input
                              type="checkbox"
                              id="sports"
                              name="Running"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Running") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Walking
                            <input
                              type="checkbox"
                              id="sports"
                              name="Walking"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Walking") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Hiking
                            <input
                              type="checkbox"
                              id="sports"
                              name="Hiking"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Hiking") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Volley ball
                            <input
                              type="checkbox"
                              id="sports"
                              name="Volleyball"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Volleyball") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Yoga
                            <input
                              type="checkbox"
                              id="sports"
                              name="Yoga"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Yoga") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Extreme Sport
                            <input
                              type="checkbox"
                              id="sports"
                              name="ExtremeSport"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("ExtremeSport") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Skating
                            <input
                              type="checkbox"
                              id="sports"
                              name="Skating"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Skating") != -1}
                            ></input>
                            <span className="checkmark"></span>
                          </label>
                          <label className="checkbox-label pl-4 mr-5 pr-5">
                            Others
                            <input
                              type="checkbox"
                              id="sports"
                              name="Others"
                              onChange={this.handleCheck}
                              checked={sports.indexOf("Others") != -1}
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
          <hr />
          <div className="text-center">
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
