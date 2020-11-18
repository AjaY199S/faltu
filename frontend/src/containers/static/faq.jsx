/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { ERRORMSG } from "../../globals/constant"; //to show error msg
import showNotification from "../../services/notificationService"; // to show success notice
import * as AdminServices from "../../services/adminServices";
import { Link } from "react-router-dom";

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "faq",
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
        <section class="main-container faq pb-150 pt-150" id="main-container">
          <div class="container">
            <div class="row">
              <div class="col-lg-8">
                <div class="accordion-title text-center border-primary">
                  <h3 class="column-title text-center heading mb-5 font-weight-light text-primary pb-3">
                    <span>Our FAQ</span> Frequently Asked Questions
                  </h3>
                </div>
                <div class="gap-40"></div>
                <div id="accordion">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link pd-common pd-common collapsed"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <p>Can I register for Free?</p>
                        </button>
                      </h5>
                    </div>
                    <div
                      class="collapse show"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <p class="mb-0">
                          Yes, if you are above the age of 18 years, then you
                          can register at JoMuslim for free. Basic registration
                          is free for all.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link pd-common collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <p>How can I change my Date of Birth?</p>
                        </button>
                      </h5>
                    </div>
                    <div
                      class="collapse"
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <p>
                          You cannot change your ‘Date of Birth’ once you get
                          registered. jomuslim.com records your Date of Birth,
                          Phone and Email ID as your unique identity.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link pd-common collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <p>Where can I update my ID proof?</p>
                        </button>
                      </h5>
                    </div>
                    <div
                      class="collapse"
                      id="collapseThree"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <p>
                          You can easily update your ID proof and other required
                          documents at jomuslim.com. First login to your profile
                          and move your cursor on ‘Share’, click on ‘Document
                          Verification’ in the dropdown list and update your
                          documents in this section.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingFour">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link pd-common collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <p>
                            Why is it important to update Aadhaar card and other
                            identity documents?
                          </p>
                        </button>
                      </h5>
                    </div>
                    <div
                      class="collapse"
                      id="collapseFour"
                      aria-labelledby="headingFour"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <p>
                          It is mandatory to update your Aadhaar card or other
                          documents to verify your identity with the
                          jomuslim.com. Registration of the profile can’t be
                          completed until you don’t provide any identity
                          documents to jomuslim.com.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingFive">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link pd-common collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          <p>How do I contact customer support?</p>
                        </button>
                      </h5>
                    </div>
                    <div
                      class="collapse"
                      id="collapseFive"
                      aria-labelledby="headingFive"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <p>
                          Click on{" "}
                          <a href="mailto:support@jomuslim.com">
                            support@jomuslim.com{" "}
                          </a>{" "}
                          on top right corner to contact &amp; give feedback to
                          customer support. You can also call us on +91-124-265
                          8600 (India) to get your queries resolved with the
                          help of our customer support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="help-box">
                  <div class="help mrb-40">
                    <h2>Need any help!</h2>
                    <p>
                      Find answers to frequently asked questions about tax,
                      contacts and general customer account information
                    </p>
                    <a
                      class="btn btn-primary bg-white rounded"
                      href="contact-us.php"
                    >
                      Contact us
                    </a>
                  </div>
                  <div class="brochure mt-5">
                    Brand Brochure
                    <a href="#">
                      <i class="icon icon-download"></i>
                    </a>
                  </div>
                  <div class="quote-item quote-classic mrb-40">
                    <span class="quote-text faq-quote-text">
                      <div class="text-center">
                        <i class="icon icon-quote-left"></i>
                      </div>{" "}
                      The Forexnic loan has been the most attractive loan
                      products on the market, helping numerous
                    </span>
                    <hr />
                    <div class="quote-item-footer quote-footer-classic">
                      <img
                        class="testimonial-thumb"
                        src="images/user.png"
                        alt="testimonial"
                      />
                      <div class="quote-item-info">
                        <p class="quote-author mb-0">Jhon Cameron</p>
                        <span class="quote-subtext">Manager Walton</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
