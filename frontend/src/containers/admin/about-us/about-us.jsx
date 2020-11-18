/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import { ERRORMSG } from "../../../globals/constant";
export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "ABOUTUS",
      body: ""
    };
  }

  submitHandler = async event => {
    event.preventDefault();
    await AdminServices.updateAboutUs(this.state)
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
    await AdminServices.getAboutUs("ABOUTUS")
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
              <div className="col-sm-12">
                <div className="card">
                  <div className="p-3">
                    <h1 className="m-0">ABOUT US</h1>
                  </div>
                </div>
                <div className="card">
                  <header className="card-header head-border">
                    ABOUT US <span className="float-right"> </span>
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
