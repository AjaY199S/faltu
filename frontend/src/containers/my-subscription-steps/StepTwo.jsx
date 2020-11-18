/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG } from "../../globals/constant";
export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platinum: props.getStore().platinum ? props.getStore().platinum : "",
      gold: props.getStore().gold ? props.getStore().gold : "",
      payment: props.getStore().payment ? props.getStore().payment : "",
      client: {},
      record: props.getStore().record ? props.getStore().record : "",
      cvc: "",
      expiry: "",
      name: "",
      number: "",
      startDate: new Date(),
    };
  }

  componentWillMount = () => {
    this.setState(this.props.getStore());
    this.setState({
      client: {
        sandbox:
          "AfwUnb6JHNmnJR0ZK9M2KVZRy04_J2Af-4BaUMxCj4R5fox8ZT1ybT2-2kW-hVXt57YkZjCslqqbWXTI",
      },
    });
  };

  onSuccess = async (payment) => {
    let data = {
      transactionId: payment.paymentID,
      plan:
        this.state.platinum != ""
          ? "platinum"
          : this.state.gold != ""
          ? "gold"
          : "Default",
      timePeriod:
        this.state.platinum || this.state.gold === "7200.00"
          ? "12 Months"
          : this.state.platinum || this.state.gold === "3600.00"
          ? "3 Months"
          : this.state.platinum || this.state.gold === "1800.00"
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

    await UserService.addSubPayment(data)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.props.updateStore(["record"], responseData.data);
          this.setState({ record: responseData.data });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  onCancel = (data) => {};
  onError = (err) => {
    console.log("Error!", err);
  };

  handlChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  nameChange = (event) => {
    var key = event.keyCode;
    return (key >= 65 && key <= 90) || key == 8;
  };

  handleSubmit = () => {};

  render() {
    const { platinum, gold, payment, client } = this.state;
    return (
      <div id="step-2" className="setup-content">
        <div className="row">
          <div className="col-12 text-center mb-2">
            <div className="border-primary mb-3 pb-1">
              <h5 className="font-weight-light text-color">
                {payment === "paypal"
                  ? "Pay Using Paypal"
                  : "Credit / Debit Card"}
              </h5>
            </div>
          </div>
        </div>
        {payment === "paypal" ? (
          <PaypalExpressBtn
            client={client}
            currency={"USD"}
            total={parseFloat(platinum ? platinum : gold ? gold : "0.01")}
            name="payment"
            value="paypal"
            onChange={this.handleChange}
            onError={this.onError}
            onSuccess={this.onSuccess}
            onCancel={this.onCancel}
            onClick={() => this.props.jumpToStep(2)}
          />
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Name on Card*</label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Name"
                    onKeyPress={this.nameChange}
                    onChange={this.handlChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Card Number*</label>{" "}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Card Number"
                    name="number"
                    onChange={this.handlChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Security Code*</label>{" "}
                  <input
                    type="number"
                    className="form-control"
                    name="cvc"
                    placeholder="Enter Security Code*"
                    onChange={this.handlChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-field">
                <div className="form-group">
                  <label className="mb-1">Expiration Date*</label>{" "}
                  <DatePicker
                    selected={this.state.startDate}
                    className="form-control"
                    onChange={this.handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    name="expiry"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <hr />
        <div className="row justify-content-center">
          <div className="text-center">
            {payment === "paypal" ? (
              <button
                onClick={() => this.props.jumpToStep(2)}
                className="btn btn-next-prev nextBtn btn-lg pull-right next action-button rounded bg-success m-0"
                type="button"
              >
                Show Receipt
              </button>
            ) : (
              <button
                onClick={this.props.submitHandle}
                className="btn btn-next-prev nextBtn btn-lg pull-right next action-button rounded bg-success m-0"
                type="button"
              >
                Make Payment
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
