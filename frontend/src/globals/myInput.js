/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import { withFormsy } from "formsy-react";
import React from "react";
import base from "../../globals/base";

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
  }

  changeValue = event => {
    if (this.props.errorMessage) {
      this.setState({ errorMessage: this.props.errorMessage });
    } else {
      this.setState({ errorMessage: "" });
    }
    this.props.setValue(event.currentTarget.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          onChange={this.changeValue}
          className="form-control"
          name={this.props.name}
          value={this.props.value || ""}
          type={this.props.type || "text"}
          placeholder={this.props.placeholder || "enter value"}
          autoComplete="off"
        />
        <span className="validation-error">{this.state.errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(MyInput);
