/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Loading from "react-fullscreen-loading";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as UserService from "../../services/userAuthService";
import { ERRORMSG } from "../../globals/constant";
import showNotification from "../../services/notificationService";
export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      fullName: "",
      comments: "",
      loading: false,
    };
    this.state = this.initialState;
  }
  componentWillMount = () => {};

  submitHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    await UserService.saveContacts(this.state)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          setTimeout(() => {
            this.setState(this.initialState);
          }, 800);
          showNotification("success", responseData.message);
        } else {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 800);
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 800);
        showNotification("danger", ERRORMSG);
      });
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { loading, email, fullName, comments } = this.state;
    return (
      <div className="animated fadeInUp">
        <section
          className="main-container contact-us pt-150 pb-150 custom-tabbing-style contact-us"
          id="main-container"
        >
          <div className="container mb-lg-3">
            <div className="row text-center">
              <div className="col-md-12">
                <div className="text-center border-primary">
                  <h2 className="text-center heading font-weight-light text-primary pb-3 section-title">
                    Got a Question?
                  </h2>
                </div>
                <p className="mb-3">(Write us below)</p>
              </div>
            </div>
          </div>
          <div className="ts-form" id="ts-form">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <form className="contact-form" id="contact-form">
                    <div className="error-container"></div>
                    <div className="row">
                      <div className="col-lg-12">
                        <h5 className="mb-3 text-justify desc">
                          We are here to help & answer any question you might
                          have. We look forward to hearing from you
                        </h5>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control form-name"
                            id="name"
                            name="fullName"
                            value={fullName}
                            onChange={this.formHandler}
                            placeholder="Full Name"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control form-email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.formHandler}
                            placeholder="Email"
                            type="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        onClick={this.submitHandler}
                        className="btn btn-primary rounded text-white"
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control form-message required-field"
                        id="message"
                        name="comments"
                        value={comments}
                        placeholder="Comments"
                        onChange={this.formHandler}
                        rows="8"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Loading loading={loading} background="#999da3" loaderColor="#3498db" />
      </div>
    );
  }
}
