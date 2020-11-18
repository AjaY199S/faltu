/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import { ERRORMSG } from "../../globals/constant"; //to show error msg
import showNotification from "../../services/notificationService"; // to show success notice

export default class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //for fetching data at time of render
  componentWillMount = async () => {
    await UserService.getUserPersonality()
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

  //set values in state
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //for post data
  submitHandle = async () => {
    await UserService.updateUserPersonality(this.state)
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
    return (
      <div
        className="tab-pane fade show active personality-profile"
        id="v-pills-personality"
        role="tabpanel"
        aria-labelledby="v-pills-personality-tab"
      >
        <form>
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">
              Personality Profile
            </h3>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="text-field">
                <div className="form-group card border-0">
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What are your favourite Movies?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="favouriteMovie"
                          value={this.state.favouriteMovie}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What are your favourite books?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          name="favouriteBooks"
                          value={this.state.favouriteBooks}
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What foods do you like ?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          value={this.state.foodLike}
                          name="foodLike"
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What music do you listen?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="musicLike"
                          value={this.state.musicLike}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What are your hobbies and interest?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="hobbiesInterest"
                          value={this.state.hobbiesInterest}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    How would you describe your dress code in daily basis?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="dressCode"
                          value={this.state.dressCode}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    How would you describe your sense of humour?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="senseOfHumor"
                          value={this.state.senseOfHumor}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What personality type are you?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="personality"
                          value={this.state.personality}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Where have you travelled or would like to travel to?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="travelled"
                          value={this.state.travelled}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    How adaptive are you?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="adaptive"
                          value={this.state.adaptive}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    How do you think if your future spouse is from different
                    country and different background?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="havingPartnerFromDifferentCulture"
                          value={this.state.havingPartnerFromDifferentCulture}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What kind of person would be your perfect match?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="perfectMatch"
                          value={this.state.perfectMatch}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    How will you spend your time with your spouse?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="perfectRomanticWeekend"
                          value={this.state.perfectRomanticWeekend}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What language do you speak?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="languageSpoke"
                          value={this.state.languageSpoke}
                          onChange={this.handleChange}
                        ></textarea>
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
                  <h5 className="text-color mb-3 mt-0">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    What qualities can you invest to your future spouse?
                  </h5>

                  <div className="card-body bg-light p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control py-0 mb-0"
                          placeholder="Type Answer"
                          name="qualitiesInvestFutureSpouse"
                          value={this.state.qualitiesInvestFutureSpouse}
                          onChange={this.handleChange}
                        ></textarea>
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
