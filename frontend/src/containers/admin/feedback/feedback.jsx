/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import moment from "moment";
import * as AdminServices from "../../../services/adminServices";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { ERRORMSG, PERPAGE } from "../../../globals/constant";
import StarRatings from "react-star-ratings";

import base from "../../../globals/base";
const IMG = base + "assets/images/customer.png";
export default class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      count: 0,
      perPage: PERPAGE,
    };
  }

  componentWillMount = async () => {
    this.listFeedback();
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.userLists(selected);
  };

  listFeedback = async (body) => {
    let self = this;
    body = body ? body : 1;
    await AdminServices.getFeedback(self.state.perPage, body)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
          responseData.data.users.map((data) => {
            data.day = moment(data.createdOn).calendar();
            data.duration = moment(data.createdOn).startOf("day").fromNow();
            data.time = moment(data.createdOn).format("LT");
          });
          self.setState({ record: responseData.data.users });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  render() {
    const { record, count, perPage } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Feedback & Rating</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="index.php">Feedback & Rating</a>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row feddback-rating">
              <div className="col-12">
                {record.length > 0 ? (
                  <div className="timeline" dir="ltr">
                    <article className="timeline-item">
                      <h2 className="m-0 d-none">&nbsp;</h2>
                      <div className="time-show mt-0">
                        <a href="#" className="btn btn-common width-lg">
                          Today
                        </a>
                      </div>
                    </article>
                    {record.map((users, key) => (
                      <article
                        key={key}
                        className={
                          key % 2 == 0
                            ? "timeline-item timeline-item-left"
                            : "timeline-item"
                        }
                      >
                        <div className="timeline-desk">
                          <div className="timeline-box pb-4">
                            <span className="arrow-alt"></span>{" "}
                            <span className="timeline-icon">
                              <i className="mdi mdi-adjust"></i>
                            </span>
                            <h4 className="mt-0 font-16">
                              {users.duration ? users.duration : ""}
                            </h4>
                            <p className="text-muted">
                              <small>{users.time ? users.time : ""}</small>
                            </p>
                            <h4>
                              {users.userId.firstName
                                ? users.userId.firstName
                                : ""}{" "}
                              {users.userId.lastName
                                ? users.userId.lastName
                                : ""}
                            </h4>
                            <p className="mb-1">
                              {users.feedback ? users.feedback : ""}
                            </p>
                            <ul className="rating-stars pl-0 d-flex float-right mt-1">
                              <StarRatings
                                rating={users.rating ? users.rating : 0}
                                starRatedColor="pink"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                                name="rating"
                              />
                            </ul>
                            <br />
                            <hr className="pb-0 mb-0" />
                            <a href="#">Comments</a>
                          </div>
                        </div>
                      </article>
                    ))}
                    <ul className="pagination pagination-rounded justify-content-end mb-0 p-4">
                      <ReactPaginate
                        previousLabel={"←previous"}
                        nextLabel={"next→"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={count}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={perPage}
                        onPageChange={this.handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </ul>
                  </div>
                ) : (
                  <h5 className="text-center">No Record found!!</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
