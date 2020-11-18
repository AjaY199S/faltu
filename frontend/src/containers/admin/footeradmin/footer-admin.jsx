/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../../globals/base";

export default class FooterAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer-admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              Copyright © 2020 OZVID Technologies Pvt. Ltd. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
