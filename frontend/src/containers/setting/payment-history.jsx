/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG, PAYPALKEY } from "../../globals/constant";

export default class PaymentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
    };
  }

  componentWillMount = async () => {
    await UserService.getPayments()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({ record: responseData.data });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const { record } = this.state;
    return (
      <div>
        <div
          className="tab-pane show payment"
          id="v-pills-payment"
          role="tabpanel"
          aria-labelledby="v-pills-payment-tab"
        >
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">
              Payment History
            </h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                {record.length > 0 ? (
                  <table
                    className="table table-centered table-striped"
                    id="products-datatable"
                  >
                    <thead>
                      <tr>
                        <th>Payment Method</th>
                        <th>Payment Date & Time</th>
                        <th>Amount($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.map((data, key) => (
                        <tr key={key}>
                          <td>{data.paymentMethod}</td>
                          <td>{data.createdOn}</td>
                          <td>{data.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h5 className="text-center">No Record found!!</h5>
                )}
              </div>
            </div>
          </div>

          <div className="modal fade" id="edit">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-white">Upadte</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label">Subscriber Name</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter the subscriber name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Subscription Date</label>{" "}
                    <input
                      className="form-control"
                      type="date"
                      placeholder="Enter the subscription date"
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Price($)</label>{" "}
                    <input
                      className="form-control"
                      type="numer"
                      placeholder="Enter the language"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-common">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="view">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">View</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Subscriber Name</th>
                          <td>Platinum</td>
                        </tr>
                        <tr>
                          <th>Subscription Date</th>
                          <td>22 Jun, 1972</td>
                        </tr>
                        <tr>
                          <th>Price($)</th>
                          <td>10</td>
                        </tr>
                        <tr>
                          <th>No. of Payments</th>
                          <td>10</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>
                            <span className="badge badge-danger">
                              Not Active
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
