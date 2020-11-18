/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import StepsProfileSetup from "../common-profile/common";
export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="tab-pane fade show active"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <section className="main-container contact-us " id="main-container">
          <StepsProfileSetup />
        </section>
      </div>
    );
  }
}
