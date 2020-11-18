/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG } from "../../globals/constant";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
export default class SavedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: []
    };
  }

  componentWillMount = async () => {
    await UserService.getSaveSearchList()
      .then(response => {
        let responseData = response.data;
        if (responseData.success) {
          this.setState({ savedList: responseData.data });
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };

  handlePageChange = id => {
    this.props.history.push({
      pathname: "/search-setup",
      state: {
        record: id
      }
    });
  };

  getRecord = id => {
    confirmAlert({
      title: "Confirm for delete.",
      message: "Are you sure want to Delete this ?",
      buttons: [
        {
          label: "Yes",
          className: "alert-true",
          onClick: () => this.deleteRecord(id)
        },
        {
          label: "No"
        }
      ]
    });
  };

  deleteRecord = async id => {
    await UserService.deleteSaved(id)
      .then(response => {
        let responseData = response.data;
        if (responseData.success) {
          this.componentWillMount();
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch(err => {
        showNotification("danger", ERRORMSG);
      });
  };
  render() {
    const { savedList } = this.state;
    return (
      <div>
        <form>
          <div className="text-center border-primary mb-4">
            <h3 className="font-weight-light text-primary pb-3">
              Saved Search
            </h3>
          </div>
          <div className="card-body bg-light text-left">
            <div className="row">
              <div className="col-md-12">
                <p className="mb-0">
                  <strong>You have {savedList.length} saved searches.</strong>
                </p>
              </div>
            </div>
            <hr />
            {savedList.reverse().map((data, key) => (
              <div className="row" key={key}>
                <div className="col-md-12 d-flex">
                  <a className="mb-0" href="#">
                    <strong>Save Search</strong>
                  </a>
                  &nbsp;
                  {data.savedSearchearchAs
                    ? data.savedSearchearchAs.slice(0, 10)
                    : ""}
                  <div className="text-right actions ml-auto">
                    <a
                      onClick={() => this.handlePageChange(data._id)}
                      className="action-icon pr-2"
                      data-toggle="modal"
                      data-target="#edit"
                      title="Edit"
                    >
                      <i className="icon-edit"></i>
                    </a>

                    <a
                      className="action-icon pr-2 delete"
                      title="Delete"
                      onClick={() => this.getRecord(data._id)}
                    >
                      <i className="icon-delete"></i>
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            <div className="row">
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  onClick={this.submitHandle}
                  className="btn btn-common"
                >
                  <Link to="/search-setup/" className="btn-color">
                    Create a new saved search
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
