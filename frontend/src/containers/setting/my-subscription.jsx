/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import StepsSubscriptionsSetup from "../common-profile/common-subscription";
export default class MySubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platinum: false,
      gold: false,
      twelveMonth: false,
      threeMonth: false,
      oneMonth: false,
      card: false,
      paypal: false,
      skrill: false,
    };
  }

  render() {
    const {
      platinum,
      gold,
      twelveMonth,
      oneMonth,
      threeMonth,
      card,
      paypal,
      skrill,
    } = this.state;
    return (
      <div>
        <div
          className="tab-pane show setting-membership"
          id="v-pills-subscription"
          role="tabpanel"
          aria-labelledby="v-pills-subscription-tab"
        >
          <div className="text-center border-primary mb-5">
            <h3 className="font-weight-light text-primary pb-3">
              My Subscription
            </h3>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <StepsSubscriptionsSetup />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
