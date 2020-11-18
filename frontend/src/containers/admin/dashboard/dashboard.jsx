/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { Bar, Line } from "react-chartjs-2";

import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import base from "../../../globals/base";
import {
  ERRORMSG,
  PERPAGE,
  SERVERURL,
  HEIGHT,
} from "../../../globals/constant";
import { Link } from "react-router-dom";
const IMG = base + "assets/images/customer.png";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: "",
      listBrides: [],
      listGrooms: [],
      totalRegistered: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    this.states = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Registered",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.totalRegistered,
        },
      ],
    };
  }

  componentWillMount = async () => {
    this.chartRegisteredUser();
    this.dashBoardData();
    this.bridesLists();
    this.groomLists();
  };

  dashBoardData = async () => {
    await AdminServices.dashBoardRecord()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({ record: responseData.data });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  bridesLists = async () => {
    await AdminServices.topBrides()
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success) {
          await responseData.data.map((data) => {
            if (data.role != "") {
              let details = JSON.parse(data.role);
              if (details.height && details.height != "") {
                function isHeight(datas) {
                  return datas.id == details.height;
                }
                details.height = HEIGHT.find(isHeight);
              }
              data.role = details;
            }
          });
          this.setState({ listBrides: responseData.data });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };
  groomLists = async () => {
    await AdminServices.topGrooms()
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success) {
          await responseData.data.map((data) => {
            if (data.role != "") {
              let details = JSON.parse(data.role);
              if (details.height && details.height != "") {
                function isHeight(datas) {
                  return datas.id == details.height;
                }
                details.height = HEIGHT.find(isHeight);
              }
              data.role = details;
            }
          });
          this.setState({ listGrooms: responseData.data });
        } else {
          showNotification("danger", responseData.error);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  chartRegisteredUser = async () => {
    await AdminServices.sortRegisteredUser()
      .then(async (response) => {
        let responseData = response.data;
        if (responseData.success) {
          await responseData.data.map((data) => {
            if (data && data != "") {
              this.state.totalRegistered.splice(
                data._id.month - 1,
                0,
                data.count
              );
            }
          });
          this.setState({ totalRegistered: await this.state.totalRegistered });
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const { record, listGrooms, listBrides } = this.state;

    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Users</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index-admin.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="user-account.php">Dashboard</a>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-3">
                <Link to="/admin/user-list">
                  <div className="widget-rounded-circle card-box top-card border-left">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border">
                          <i className="fa fa-registered font-22 avatar-title text-primary"></i>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">
                              {record.userCount ? record.userCount : "0"}
                            </span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">
                            Registered Users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6 col-xl-3">
                <a>
                  <div className="widget-rounded-circle card-box top-card border-left">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border">
                          <i className="fa fa-info-circle font-22 avatar-title text-primary"></i>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">
                              {record.interestCount
                                ? record.interestCount
                                : "0"}
                            </span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">
                            Interested Users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-md-6 col-xl-3">
                <a>
                  <div className="widget-rounded-circle card-box top-card border-left">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border">
                          <i className="fa fa-heart font-22 avatar-title text-primary"></i>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">
                              {record.favoriteCount
                                ? record.favoriteCount
                                : "0"}
                            </span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">
                            Favorite Users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a>
                  <div className="widget-rounded-circle card-box top-card border-left">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border">
                          <i className="fa fa-users font-22 avatar-title text-primary"></i>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">
                              {record.mutualMatches
                                ? record.mutualMatches
                                : "0"}
                            </span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">
                            Mutual Matches Users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="float-right d-none d-md-inline-block">
                      <div className="btn-group mb-2"></div>
                    </div>
                    <h4 className="header-title">User Registrations</h4>

                    <div className="mt-3 chartjs-chart">
                      <Bar
                        data={this.states}
                        options={{
                          title: {
                            display: true,
                            text: "Average Record per month",
                            fontSize: 20,
                          },
                          legend: {
                            display: true,
                            position: "right",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card-box">
                  <h4 className="header-title mb-3 pb-2">Total Revenue</h4>

                  <div className="widget-chart text-center" dir="ltr">
                    <input
                      data-plugin="knob"
                      data-width="160"
                      data-height="160"
                      data-linecap="round"
                      data-fgcolor="#f1556c"
                      data-skin="tron"
                      data-angleoffset="180"
                      data-readonly="true"
                      data-thickness=".12"
                    />
                    <h5 className="text-muted mt-4 pt-3">
                      Total sales made today
                    </h5>
                    <h2>$178</h2>
                    <div className="row mt-4 pt-1">
                      <div className="col-4">
                        <p className="text-muted font-15 mb-1 text-truncate">
                          Target
                        </p>
                        <h4>
                          <i className="fe-arrow-down text-danger mr-1"></i>
                          $7.8k
                        </h4>
                      </div>
                      <div className="col-4">
                        <p className="text-muted font-15 mb-1 text-truncate">
                          Last week
                        </p>
                        <h4>
                          <i className="fe-arrow-up text-success mr-1"></i>$1.4k
                        </h4>
                      </div>
                      <div className="col-4">
                        <p className="text-muted font-15 mb-1 text-truncate">
                          Last Month
                        </p>
                        <h4>
                          <i className="fe-arrow-down text-danger mr-1"></i>$15k
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="card-box border-top">
                  <h4 className="header-title mb-3">Top 5 Bride Groom</h4>
                  <div className="table-responsive">
                    {listBrides.length > 0 ? (
                      <table className="table table-borderless table-hover table-centered m-0 approvals-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Height</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listBrides.map((users, key) => (
                            <tr key={key}>
                              <td className="image">
                                <img
                                  src={
                                    users.profileImg
                                      ? SERVERURL + users.profileImg
                                      : IMG
                                  }
                                  alt="contact-img"
                                  title="contact-img"
                                  className="rounded-circle avatar-sm img-fluid img-fluid"
                                />
                              </td>
                              <td>
                                <h5 className="m-0 font-weight-normal">
                                  {users.firstName ? users.firstName : ""}{" "}
                                  {users.lastName ? users.lastName : ""}
                                </h5>
                              </td>
                              <td>{users.email ? users.email : ""}</td>
                              <td>{users.phoneNo ? users.phoneNo : ""}</td>
                              <td>
                                {users.role != ""
                                  ? users.role.height
                                    ? users.role.height
                                      ? users.role.height.value
                                      : "NA"
                                    : "NA"
                                  : "NA"}
                              </td>
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
              <div className="col-xl-6">
                <div className="card-box border-top">
                  <h4 className="header-title mb-3">Top 5 Bride</h4>
                  <div className="table-responsive">
                    {listGrooms.length > 0 ? (
                      <table className="table table-borderless table-hover table-centered m-0 approvals-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Height</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listGrooms.map((users, key) => (
                            <tr key={key}>
                              <td className="image">
                                <img
                                  src={
                                    users.profileImg
                                      ? SERVERURL + users.profileImg
                                      : IMG
                                  }
                                  alt="contact-img"
                                  title="contact-img"
                                  className="rounded-circle avatar-sm img-fluid img-fluid"
                                />
                              </td>
                              <td>
                                <h5 className="m-0 font-weight-normal">
                                  {users.firstName ? users.firstName : ""}{" "}
                                  {users.lastName ? users.lastName : ""}
                                </h5>
                              </td>
                              <td>{users.email ? users.email : ""}</td>
                              <td>{users.phoneNo ? users.phoneNo : ""}</td>
                              <td>
                                {users.role != ""
                                  ? users.role.height
                                    ? users.role.height
                                      ? users.role.height.value
                                      : "NA"
                                    : "NA"
                                  : "NA"}
                              </td>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
