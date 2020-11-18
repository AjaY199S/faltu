/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG, PAYPALKEY } from "../../globals/constant";
import "../common-profile/main.css";

export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platinum: props.getStore().platinum ? props.getStore().platinum : "",
      gold: props.getStore().platinum ? props.getStore().platinum : "",
      payment: props.getStore().platinum ? props.getStore().platinum : "",
    };
  }

  handleChange = (event) => {
    if (event.target.name === "platinum") {
      this.props.updateStore(["gold"], "");
      this.setState({ ["gold"]: "" });
    } else if (event.target.name === "gold") {
      this.props.updateStore(["platinum"], "");
      this.setState({ ["platinum"]: "" });
    }
    this.props.updateStore([event.target.name], event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { platinum, gold, client } = this.state;
    return (
      <div id="step-1" className="setup-content">
        <div className="row">
          <div className="col-12 text-center mb-5 mt-4">
            <div className="border-primary mb-3 pb-1">
              <h5 className="font-weight-light text-color">
                Send Unlimited Communications
              </h5>
            </div>
            <p className="desc m-auto">
              Premium members can talk instantly with other members through our
              instant messenger. Upgrade now to unlock unlimited communications.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="text-field">
              <div className="form-group card border-0">
                <div className="card-header p-0" id="headingStep1">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Is Step 1 - Choose a subscription
                  </h6>
                </div>
                <div className="card-body bg-light">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active bg-gold"
                            data-toggle="tab"
                            href="#platinum"
                          >
                            Platinum
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#gold"
                          >
                            Gold
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content py-4 px-3">
                        <div
                          id="platinum"
                          className="container tab-pane active"
                        >
                          <h4 className="mb-4 text-color">Platinum</h4>
                          <div className="table-responsive">
                            <table className="table step1-table">
                              <tbody>
                                <tr>
                                  <td className="text-left">12 Months</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <input
                                        type="radio"
                                        name="platinum"
                                        value="7200.00"
                                        onChange={this.handleChange}
                                        required
                                      />{" "}
                                      <strong>Rs 600.00 INR </strong>
                                      <span> per month</span>
                                      <span className="checkmark"></span>
                                      <br />{" "}
                                      <span className="nested-desc">
                                        Billed in one payment of Rs 7,200.00 INR
                                      </span>{" "}
                                    </label>
                                  </td>

                                  <td>
                                    <label className="badge badge-auto text-white p-3 m-0">
                                      Save 67%
                                    </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">3 Months</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <strong>Rs 1,200.00 INR</strong>
                                      <span> per month</span>
                                      <input
                                        type="radio"
                                        name="platinum"
                                        value="3600.00"
                                        onChange={this.handleChange}
                                      />{" "}
                                      <span className="checkmark"></span> <br />{" "}
                                      <span className="nested-desc">
                                        Billed in one payment of Rs 3,600.00 INR
                                      </span>{" "}
                                    </label>
                                  </td>
                                  <td>
                                    <label className="badge badge-auto text-white p-3 m-0">
                                      Save 3%
                                    </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">1 Month</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <strong>Rs 1800.00 INR </strong>
                                      <span> per month</span>
                                      <input
                                        type="radio"
                                        name="platinum"
                                        value="1800.00"
                                        onChange={this.handleChange}
                                      />{" "}
                                      <span className="checkmark"></span>{" "}
                                    </label>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div id="gold" className="container tab-pane fade">
                          <h3 className="text-color">Gold</h3>
                          <div className="table-responsive">
                            <table className="table step1-table">
                              <tbody>
                                <tr>
                                  <td className="text-left">12 Months</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <strong>Rs 600.00 INR </strong>
                                      <span> per month</span>
                                      <input
                                        type="radio"
                                        name="gold"
                                        value="7200.00"
                                        onChange={this.handleChange}
                                      />{" "}
                                      <span className="checkmark"></span>
                                      <br />{" "}
                                      <span className="nested-desc">
                                        Billed in one payment of Rs 7,200.00 INR
                                      </span>{" "}
                                    </label>
                                  </td>

                                  <td>
                                    <label className="badge badge-auto text-white p-3 m-0">
                                      Save 67%
                                    </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">3 Months</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <strong>Rs 1,200.00 INR</strong>
                                      <span> per month</span>
                                      <input
                                        type="radio"
                                        name="gold"
                                        value="3600.00"
                                        onChange={this.handleChange}
                                      />{" "}
                                      <span className="checkmark"></span> <br />{" "}
                                      <span className="nested-desc">
                                        Billed in one payment of Rs 3,600.00 INR
                                      </span>{" "}
                                    </label>
                                  </td>
                                  <td>
                                    <label className="badge badge-auto text-white p-3 m-0">
                                      Save 3%
                                    </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-left">1 Month</td>
                                  <td>
                                    <label className="radio-label left m-0 p-0">
                                      <strong>Rs 1800.00 INR </strong>
                                      <span> per month</span>
                                      <input
                                        type="radio"
                                        name="gold"
                                        value="1800.00"
                                        onChange={this.handleChange}
                                      />{" "}
                                      <span className="checkmark"></span>{" "}
                                    </label>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
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
        <div className="row">
          <div className="col-lg-12">
            <div className="text-field">
              <div className="form-group card border-0">
                <div className="card-header p-0" id="headingStep2">
                  <h6 className="text-color mb-3">
                    <i
                      className="icon-hand-o-right pr-2"
                      aria-hidden="true"
                    ></i>
                    Is Step 2 - Choose a payment method
                  </h6>
                </div>

                <div className="card-body bg-light">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="tab-content py-4 px-3">
                        <div
                          id="platinum"
                          className="container tab-pane active"
                        >
                          <h4 className="mb-4 text-color">Platinum</h4>
                          <div className="table-responsive">
                            <PayPalButton
                              options={{
                                clientId: PAYPALKEY,
                              }}
                              amount="0.01"
                              shippingPreference="NO_SHIPPING"
                              onSuccess={async (details, data) => {
                                let datas = {
                                  transactionId: details.id,
                                  plan:
                                    this.state.platinum != ""
                                      ? "platinum"
                                      : this.state.gold != ""
                                      ? "gold"
                                      : "Default",
                                  timePeriod:
                                    this.state.platinum ||
                                    this.state.gold === "7200.00"
                                      ? "12 Months"
                                      : this.state.platinum ||
                                        this.state.gold === "3600.00"
                                      ? "3 Months"
                                      : this.state.platinum ||
                                        this.state.gold === "1800.00"
                                      ? "1 Month"
                                      : "",
                                  amount:
                                    this.state.platinum != ""
                                      ? this.state.platinum
                                      : this.state.gold != ""
                                      ? this.state.gold
                                      : "0.01",
                                  paymentMethod: "Paypal",
                                };

                                await UserService.addSubPayment(datas)
                                  .then((response) => {
                                    let responseData = response.data;
                                    if (responseData.success) {
                                      showNotification(
                                        "success",
                                        responseData.message
                                      );
                                      this.props.updateStore(
                                        ["record"],
                                        responseData.data
                                      );
                                      this.setState({
                                        record: responseData.data,
                                      });
                                    } else {
                                      showNotification(
                                        "danger",
                                        responseData.message
                                      );
                                    }
                                  })
                                  .catch((err) => {
                                    showNotification("danger", ERRORMSG);
                                  });
                              }}
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

        <div className="text-center">
          <a
            onClick
            className="btn btn-common text-white nextBtn"
            onClick={() => this.props.jumpToStep(1)}
          >
            Upgrade Now
          </a>
        </div>
      </div>
    );
  }
}
