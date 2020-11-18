import React from "react";
import { ERRORMSG } from "../../globals/constant"; //to show error msg
import showNotification from "../../services/notificationService"; // to show success notice
import * as AdminServices from "../../services/adminServices";
import { Link } from "react-router-dom";

export default class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "PrivacyPolicy",
      body: ""
    };
  }
  componentWillMount = async () => {
    await AdminServices.getTerms("PrivacyPolicy")
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

  render() {
    const { body } = this.state;

    return (
      <div>
        <section class="terms-conds pb-150 pt-150">
          <div class="container">
            <div class="text-center border-primary">
              <h2 class="text-center heading mb-4 font-weight-light text-primary pb-3">
                Policy Rules
              </h2>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <p>{body}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
