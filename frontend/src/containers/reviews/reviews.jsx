/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React from "react";
import StarRatings from "react-star-ratings";
import "./review.Style.css";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG, PERPAGE } from "../../globals/constant";
import ReactPaginate from "react-paginate";
export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecord: [],
      totalCount: 0,
      count: 0,
      perPage: PERPAGE,
      feedback: "",
      rating: 0,
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };
  }

  componentWillMount = async () => {
    this.feedbackList();
  };

  saveFeedback = async () => {
    await UserService.updateFeedback(this.state)
      .then((response) => {
        document.getElementById("close").click();
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.feedbackList();
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  feedbackList = async (body, filter, order) => {
    let self = this;
    body = body ? body : 1;
    let data = {
      body: body,
    };
    if (filter) {
      data = {
        rating: filter,
        body: body,
      };
    }
    await UserService.getFeedback(self.state.perPage, data)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
            totalCount: responseData.data.totalCount,
            totalRecord: responseData.data.users,
            oneStar: responseData.data.oneStar,
            twoStar: responseData.data.twoStar,
            threeStar: responseData.data.threeStar,
            fourStar: responseData.data.fourStar,
            fiveStar: responseData.data.fiveStar,
          });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating,
    });
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.feedbackList(selected);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getReview = async () => {
    await UserService.getSingleFeedback()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({
            rating: responseData.data.rating ? responseData.data.rating : 0,
            feedback: responseData.data.feedback,
          });
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  ratingChange = (event) => {
    if (event.target.value != 0) {
      this.feedbackList(1, event.target.value);
    } else {
      this.feedbackList();
    }
  };

  render() {
    const {
      count,
      totalRecord,
      perPage,
      feedback,
      rating,
      totalCount,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
    } = this.state;
    return (
      <div>
        <section className="pt-80 pb-150 msg-detail custom-tabbing-style activity">
          <div className="container" id="interested-in-me">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center border-primary mb-5">
                  <h2 className="font-weight-light text-primary pb-3">
                    My Reviews
                  </h2>
                </div>
                <div className="row">
                  <div className="col-md-4 col-lg-3">
                    <div className="visible-xs-block">
                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-block"
                          data-toggle="modal"
                          data-target="#basicModal"
                          onClick={this.getReview}
                        >
                          Write a Review
                        </button>
                      </div>
                      <div className="form-group">
                        <select
                          onChange={this.ratingChange}
                          className="form-control"
                        >
                          <option value="0">show all ({totalCount})</option>
                          <option value="5"> 5 Star({fiveStar})</option>
                          <option value="4">4 Star({fourStar})</option>
                          <option value="3">3 Star({threeStar})</option>
                          <option value="2">2 Star({twoStar})</option>
                          <option value="1">1 Star({oneStar})</option>
                        </select>
                      </div>
                    </div>
                    <div className="hidden-xs">
                      <div className="form-group">
                        <h6>Filter Reviews</h6>
                        <ul className="list-group leftlist">
                          <li className="list-group-item">
                            <StarRatings
                              rating={5}
                              starRatedColor="pink"
                              starDimension="20"
                              starSpacing="5px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </li>
                          <li className="list-group-item">
                            <StarRatings
                              rating={4}
                              starRatedColor="pink"
                              starDimension="20"
                              starSpacing="5px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </li>
                          <li className="list-group-item">
                            <StarRatings
                              rating={3}
                              starRatedColor="pink"
                              starDimension="20"
                              starSpacing="5px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </li>
                          <li className="list-group-item">
                            <StarRatings
                              rating={2}
                              starRatedColor="pink"
                              starDimension="20"
                              starSpacing="5px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </li>
                          <li className="list-group-item">
                            <StarRatings
                              rating={1}
                              starRatedColor="pink"
                              starDimension="20"
                              starSpacing="5px"
                              numberOfStars={5}
                              name="rating"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className=" col-lg-9">
                    <form name="form" method="post" action="#">
                      <div className="row">
                        <div className="col-md-6  col-lg-8 ">
                          <h6>Showing {totalCount}</h6>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <select
                            onChange={this.filterChange}
                            className="form-control"
                          >
                            <option value="1">sort newest to oldest</option>
                            <option value="-1">sort oldest to newest</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    {totalRecord.length > 0 ? (
                      totalRecord.map((users, key) => (
                        <div key={key} className="review">
                          <div className="row">
                            <div className="col-lg-3">
                              <StarRatings
                                rating={users.rating}
                                starRatedColor="pink"
                                starDimension="20"
                                starSpacing="5px"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                            <div className="col-md-9">
                              <h3>
                                {users.userId.firstName
                                  ? users.userId.firstName
                                  : ""}{" "}
                                {users.userId.lastName
                                  ? users.userId.lastName
                                  : ""}
                              </h3>
                              <p className="review-break">
                                {users.feedback ? users.feedback : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h5 className="text-center">No Record found!!</h5>
                    )}
                    <nav className="text-center" aria-label="Page navigation">
                      <ul className="pagination pagination-rounded justify-content-end mb-0 p-4">
                        <ReactPaginate
                          previousLabel={"← previous"}
                          nextLabel={"next →"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={count}
                          marginPagesDisplayed={5}
                          pageRangeDisplayed={perPage}
                          onPageChange={this.handlePageChange}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"page-link"}
                        />
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade"
          id="basicModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="basicModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <br />

                <h5>Add Review</h5>
                <br />
                <div>
                  Add Ratting:{" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="pink"
                    changeRating={this.changeRating}
                    starDimension="20"
                    starSpacing="5px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="feedback"
                    onChange={this.handleChange}
                    placeholder="Add review"
                    value={feedback}
                  >
                    Add review here
                  </textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.saveFeedback}
                  className="btn btn-primary"
                >
                  Post Review
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
