/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import StepFour from "../steps/StepFour";
import StepFive from "../steps/StepFive";
import StepZilla from "react-stepzilla";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG } from "../../globals/constant";
import "./main.css";
import "./style.css";

export default class StepsProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
    };
    this.infoStore = {};
  }

  componentWillMount = async () => {
    await UserService.userProfileDetail()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          let newData = {};
          newData = Object.assign(
            newData,
            responseData.data.basicData,
            responseData.data.appearanceData,
            responseData.data.religiousData,
            responseData.data.ownWords,
            responseData.data.lifestyleData
          );
          delete newData.userId;
          delete newData.location;
          this.infoStore = newData;
        }
        this.setState({ dataLoaded: true });
      })
      .catch((err) => {
        this.setState({ dataLoaded: true });
        showNotification("danger", ERRORMSG);
      });
  };

  getStore() {
    return this.infoStore;
  }

  updateStore(field, val) {
    this.infoStore[field] = val;
  }

  saveInfo = async () => {
    delete this.infoStore._id;
    await UserService.SaveBasicInfo(this.infoStore)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const steps = [
      {
        name: "Step1",
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
        name: "Step2",
        component: (
          <StepTwo
            getStore={() => this.getStore()}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
      {
        name: "Step3",
        component: (
          <StepThree
            getStore={() => this.getStore()}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
      {
        name: "Step4",
        component: (
          <StepFour
            getStore={() => this.getStore()}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
      {
        name: "Step5",
        component: (
          <StepFive
            getStore={() => this.getStore()}
            saveInfo={this.saveInfo}
            updateStore={(field, val) => {
              this.updateStore(field, val);
            }}
          />
        ),
      },
    ];
    const { dataLoaded } = this.state;
    return (
      <div className="example">
        <div className="step-progress">
          {dataLoaded ? (
            <StepZilla steps={steps} preventEnterSubmission={true} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
