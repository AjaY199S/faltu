/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { ERRORMSG } from "../../globals/constant"; //to show error msg
import showNotification from "../../services/notificationService"; // to show success notice
import * as AdminServices from "../../services/adminServices";
import { Link } from "react-router-dom";

export default class TermsConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TermsConditions",
      body: "",
    };
  }
  componentWillMount = async () => {
    await AdminServices.getTerms("TermsConditions")
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          this.setState(responseData.data);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const { body } = this.state;

    return (
      <div>
        <section className="terms-conds pb-150 pt-150">
          <div className="container">
            <div className="text-center border-primary">
              <h2 className="text-center heading mb-4 font-weight-light text-primary pb-3">
                Terms Rules
              </h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="terms-desc">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="terms-desc">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="terms-desc">
                  <p className="mb-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <ul className="terms-items pl-0 pt-0 black">
                    <li>
                      <i
                        className="icon icon-hand-o-right pr-2"
                        aria-hidden="true"
                      ></i>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </li>
                    <li>
                      <i
                        className="icon icon-hand-o-right pr-2"
                        aria-hidden="true"
                      ></i>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </li>
                    <li>
                      <i
                        className="icon icon-hand-o-right pr-2"
                        aria-hidden="true"
                      ></i>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </li>
                  </ul>
                </div>
                <div className="terms-desc pt-4">
                  <p className="mb-0">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
