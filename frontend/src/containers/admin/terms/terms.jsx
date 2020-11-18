/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import { ERRORMSG } from "../../../globals/constant"; //to show error msg
import showNotification from "../../../services/notificationService"; // to show success notice

export default class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TermsConditions",
      body: ""
    };
  }

  /**
   * function used for handle name and their
   * values @event {name=event.target.name, value=event.targrt.value}
   */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /*
   * function used for submit terms and conditions
   *  @this.state
   *  */
  handleSubmit = async event => {
    event.preventDefault();
    await AdminServices.updateTerms(this.state)
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

  /**
   * function used for get Terms and conditions
   */
  componentWillMount = async () => {
    await AdminServices.getTerms("TermsConditions")
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
                  <h4 className="page-title">Terms & Conditions</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="terms-conds.php">Terms & Conditions</a>
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
                    <h1 className="m-0">Terms & Conditions</h1>
                  </div>
                </div>
                <div className="card">
                  <header className="card-header head-border">
                    Terms Rules <span className="float-right"> </span>
                  </header>
                  <div className="card-box">
                    <div className="border p-3">
                      <form name="text-editor-form" method="put">
                        <textarea
                          name="body"
                          id="field1"
                          className="text-editor-textarea"
                          onChange={this.handleChange}
                          value={body}
                        ></textarea>
                      </form>
                      <div className="button text-right">
                        <button
                          type="button"
                          onClick={this.handleSubmit}
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
