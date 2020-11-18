/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: props.getStore().record ? props.getStore().record : "",
    };
  }

  render() {
    const { record } = this.state;
    return (
      <div id="step-3" className="setup-content mt-5">
        {Object.keys(record).length > 0 ? (
          <div className="row">
            <div className="col-12 text-center mb-2 successfully">
              <i className="icon-check tick-icon"></i>
              <h3 className="mt-4">Payment Successfully</h3>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive mt-4">
              {Object.keys(record).length > 0 ? (
                <table className="table step1-table">
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Time period</th>
                      <th>Total Amount</th>
                      <th>Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{record.plan ? record.plan : "NA"}</td>
                      <td>{record.timePeriod ? record.timePeriod : "NA"}</td>
                      <td>{record.amount ? record.amount : "NA"} USD</td>
                      <td>
                        {record.paymentMethod ? record.paymentMethod : "NA"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <h5 className="text-center">No Record found!!</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
