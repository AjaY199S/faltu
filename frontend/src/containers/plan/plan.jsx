/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";

export default class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="content subscription-plans pt-150 pb-150">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="text-center border-primary mb-5">
                  <h3 className="font-weight-light text-primary pb-3">
                    Our Plans
                  </h3>
                </div>

                <div className="row my-3">
                  <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div className="card card-pricing">
                      <div className="card-body text-center p-0">
                        <div className="text text-white">
                          <p className="card-pricing-plan-name font-weight-bold text-uppercase py-3">
                            Basic Plan
                          </p>

                          <h2 className="card-pricing-price p-0 free-text">
                            Free
                          </h2>
                        </div>
                        <div className="listingdata">
                          <ul className="card-pricing-features text-left pt-5 mt-3 p-3">
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Dedicated Relationship Manager
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Personal Session by RM
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Exclusive Profile Creation
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Handpicked Premium Matches
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Fixing Meeting & Weekly Feedback
                            </li>
                            <li>
                              <i className="icon icon-check pr-1 text-success"></i>
                              24x7 Support
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              3 Months Exclusive Service
                            </li>
                          </ul>
                        </div>
                        <button className="btn btn-common mb-4">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div className="card card-pricing">
                      <div className="card-body text-center p-0">
                        <div className="text text-white">
                          <p className="card-pricing-plan-name font-weight-bold text-uppercase py-3">
                            Silver Plan
                          </p>

                          <h2 className="card-pricing-price p-0">
                            <div>
                              $25 <br />
                              <span>/ Month</span>
                            </div>
                          </h2>
                        </div>
                        <div className="listingdata">
                          <ul className="card-pricing-features text-left pt-5 mt-3 p-3">
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Dedicated Relationship Manager
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Personal Session by RM
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Exclusive Profile Creation
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Handpicked Premium Matches
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Fixing Meeting & Weekly Feedback
                            </li>
                            <li>
                              <i className="icon icon-check pr-1 text-success"></i>
                              24x7 Support
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              3 Months Exclusive Service
                            </li>
                          </ul>
                        </div>

                        <button className="btn btn-common mb-4">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div className="card card-pricing">
                      <div className="card-body text-center p-0">
                        <div className="text text-white">
                          <p className="card-pricing-plan-name font-weight-bold text-uppercase py-3">
                            Gold Plan
                          </p>

                          <h2 className="card-pricing-price p-0 text-white">
                            <div>
                              $30
                              <br />
                              <span>/ Month</span>
                            </div>
                          </h2>
                        </div>
                        <div className="listingdata">
                          <ul className="card-pricing-features text-left pt-5 mt-3 p-3">
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Dedicated Relationship Manager
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Personal Session by RM
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Exclusive Profile Creation
                            </li>
                            <li>
                              <i className="icon icon-check pr-2 text-success"></i>
                              Handpicked Premium Matches
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Fixing Meeting & Weekly Feedback
                            </li>
                            <li>
                              <i className="icon icon-times pr-1 text-danger"></i>
                              24x7 Support
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              3 Months Exclusive Service
                            </li>
                          </ul>
                        </div>
                        <button className="btn btn-common mb-4">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div className="card card-pricing">
                      <div className="card-body text-center p-0">
                        <div className="text text-white">
                          <p className="card-pricing-plan-name font-weight-bold text-uppercase py-3">
                            Platinum
                          </p>

                          <h2 className="card-pricing-price p-0">
                            <div>
                              {" "}
                              $35
                              <br />
                              <span>/ Month</span>
                            </div>
                          </h2>
                        </div>
                        <div className="listingdata">
                          <ul className="card-pricing-features text-left pt-5 mt-3 p-3">
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Dedicated Relationship Manager
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Personal Session by RM
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Exclusive Profile Creation
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Handpicked Premium Matches
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              Fixing Meeting & Weekly Feedback
                            </li>
                            <li>
                              <i className="icon icon-check pr-1 text-success"></i>
                              24x7 Support
                            </li>
                            <li>
                              <i className="icon icon-times pr-2 text-danger"></i>
                              3 Months Exclusive Service
                            </li>
                          </ul>
                        </div>
                        <button className="btn btn-common mb-4">
                          Subscribe
                        </button>
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
