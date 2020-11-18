/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";
import * as UserService from "../../services/userAuthService";
import showNotification from "../../services/notificationService";
import { ERRORMSG, SERVERURL } from "../../globals/constant";
export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg1: "",
      profileImg2: "",
      profileImg3: "",
      profileImg4: "",
    };
    this.imageObject = {
      Image1: "",
      Image2: "",
      Image3: "",
      Image4: "",
    };
  }

  componentWillMount = async () => {
    let imgUrl = base + "assets/images/add.png";
    await UserService.getMedia()
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          let newObj = {
            image1: responseData.data.Image1,
            image2: responseData.data.Image2,
            image3: responseData.data.Image3,
            image4: responseData.data.Image4,
          };
          Object.keys(newObj).forEach((key, value) => {
            let newkey = value + 1;
            if (newObj[key]) {
              // this.imageObject["Image" + newkey] = newObj[key][0];
              this.setState({
                ["profileImg" + newkey]: SERVERURL + newObj[key][0]["path"],
              });
            }
          });
          console.log(this.imageObject, "asdas");
        }
      })
      .catch((err) => {});

    this.setState({
      profileImg1: this.state.profileImg1 ? this.state.profileImg1 : imgUrl,
      profileImg2: this.state.profileImg2 ? this.state.profileImg2 : imgUrl,
      profileImg3: this.state.profileImg3 ? this.state.profileImg3 : imgUrl,
      profileImg4: this.state.profileImg4 ? this.state.profileImg4 : imgUrl,
    });
  };

  onImageChange = (event) => {
    let self = event.target.name;
    if (event.target.name === "profileImg1") {
      this.imageObject.Image1 = event.target.files[0];
    } else if (event.target.name === "profileImg2") {
      this.imageObject.Image2 = event.target.files[0];
    } else if (event.target.name === "profileImg3") {
      this.imageObject.Image3 = event.target.files[0];
    } else {
      this.imageObject.Image4 = event.target.files[0];
    }
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ [self]: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  submitHandle = async () => {
    let formData = new FormData();
    Object.keys(this.imageObject).forEach((key) => {
      formData.append(key, this.imageObject[key]);
    });
    await UserService.uploadUserImg(formData)
      .then((response) => {
        let responseData = response.data;
        if (responseData.sucess) {
          showNotification("success", responseData.message);
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  removeImg = (key) => {
    let imgUrl = base + "assets/images/add.png";
    if (key === "profileImg1") {
      this.imageObject.Image1 = "";
    } else if (key === "profileImg2") {
      this.imageObject.Image2 = "";
    } else if (key === "profileImg3") {
      this.imageObject.Image3 = "";
    } else if (key === "profileImg4") {
      this.imageObject.Image4 = "";
    }
    this.setState({ [key]: imgUrl });
  };

  render() {
    const {
      profileImg1,
      profileImg2,
      profileImg3,
      profileImg4,
      imageObject,
    } = this.state;
    return (
      <div
        className="tab-pane fade active show"
        id="v-pills-messages"
        role="tabpanel"
        aria-labelledby="v-pills-messages-tab"
      >
        <div className="text-center border-primary mb-4">
          <h3 className="font-weight-light text-primary pb-3">
            Media (Photos/ Videos)
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Add Profile</label>
            <div className="p--pic pic-boder pic---wizard">
              <div className=" field-choose-file">
                <input
                  id="choose-file1"
                  className="choose-file"
                  type="file"
                  name="profileImg1"
                  onChange={this.onImageChange}
                ></input>

                <label htmlFor="choose-file1" className=" upload-file mb-30">
                  <img
                    src={profileImg1}
                    alt="image"
                    className={`img-fluid ${
                      profileImg1 === "/assets/images/add.png"
                        ? "before-upload"
                        : "after-upload"
                    }`}
                  ></img>
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Add Image</label>
            <div className="p--pic pic-boder pic---wizard">
              <div className=" field-choose-file">
                <input
                  id="choose-file2"
                  className="choose-file"
                  name="profileImg2"
                  type="file"
                  onChange={this.onImageChange}
                ></input>
                <label htmlFor="choose-file2" className="upload-file mb-30">
                  <img
                    src={profileImg2}
                    alt="image"
                    className={`img-fluid ${
                      profileImg2 === "/assets/images/add.png"
                        ? "before-upload"
                        : "after-upload"
                    }`}
                  ></img>
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Add Image</label>
            <div className="p--pic pic-boder pic---wizard">
              <div className=" field-choose-file">
                <input
                  id="choose-file3"
                  className="choose-file"
                  name="profileImg3"
                  onChange={this.onImageChange}
                  type="file"
                ></input>
                <label htmlFor="choose-file3" className=" upload-file mb-30">
                  <img
                    src={profileImg3}
                    alt="image"
                    className={`img-fluid ${
                      profileImg3 === "/assets/images/add.png"
                        ? "before-upload"
                        : "after-upload"
                    }`}
                  ></img>
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Add Image</label>
            <div className="p--pic pic-boder pic---wizard">
              {/* <div class="overicons">
                <a>
                  <i class="icon-remove"></i>
                </a>
              </div> */}
              <div className=" field-choose-file">
                <input
                  id="choose-file4"
                  className="choose-file"
                  name="profileImg4"
                  onChange={this.onImageChange}
                  type="file"
                ></input>
                <label htmlFor="choose-file4" className=" upload-file mb-30">
                  <img
                    src={profileImg4}
                    alt="image"
                    className={`img-fluid ${
                      profileImg4 === "/assets/images/add.png"
                        ? "before-upload"
                        : "after-upload"
                    }`}
                  ></img>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={this.submitHandle} className="btn-common btn">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
