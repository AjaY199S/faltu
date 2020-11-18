/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import { ERRORMSG, PERPAGE } from "../../../globals/constant";

export default class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "PrivacyPolicy",
      body: ""
    };
  }

  submitHandler = async event => {
    event.preventDefault();
    await AdminServices.updatePrivacy(this.state)
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

  formHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount = async () => {
    await AdminServices.getPolicy("PrivacyPolicy")
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
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Privacy Policy</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="terms-conds.php">Privacy Policy</a>
                      </li>
                      <li className="breadcrumb-item active">Index</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="p-3">
                    <h1 className="m-0">Privacy Policy</h1>
                  </div>
                </div>
                <div className="card">
                  <header className="card-header head-border">
                    Policy Rules <span className="float-right"> </span>
                  </header>
                  <div className="card-box">
                    <div className="border p-3">
                      <form name="text-editor-form" method="put">
                        <textarea
                          id="field1"
                          name="body"
                          className="text-editor-textarea"
                          onChange={this.formHandler}
                          value={body}
                        ></textarea>
                      </form>
                      <div className="button text-right">
                        <button
                          type="button"
                          onClick={this.submitHandler}
                          className="btn btn-common"
                        >
                          Save
                        </button>
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
