/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import StepOne from "../my-subscription-steps/StepOne";
import StepTwo from "../my-subscription-steps/StepTwo";
import StepThree from "../my-subscription-steps/StepThree";
import StepZilla from "react-stepzilla";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG } from "../../globals/constant";
import "./main.css";

export default class StepsSubscriptionsSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
    };
    this.infoStore = {};
  }

  getStore() {
    return this.infoStore;
  }

  updateStore(field, val) {
    this.infoStore[field] = val;
  }

  submitHandle = async () => {
    await UserService.addSubscription(this.infoStore).then((response) => {
      let responseData = response.data;
      if (responseData.success) {
        showNotification("success", responseData.message);
      } else {
        showNotification("danger", responseData.message);
      }
    });
  };

  render() {
    const steps = [
      {
        name: "Choose Membership",
        component: (
          <StepOne
            getStore={() => this.getStore()}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
      {
        name: "Receipt",
        component: (
          <StepThree
            getStore={() => this.getStore()}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
    ];
    return (
      <div className="example">
        <div className="step-progress">
          {<StepZilla steps={steps} preventEnterSubmission={true} />}
        </div>
      </div>
    );
  }
}
