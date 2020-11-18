/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import base from "../../globals/base";
import firebase from "../../globals/firebase";
import moment from "moment";
import Chat from "./videoChat";
import { SERVERURL, DIFFYRS, ERRORMSG } from "../../globals/constant";
import showNotification from "../../services/notificationService"; // to show success notice
import "./style.css";
import * as UserService from "../../services/userAuthService";
const IMG = base + "assets/images/customer.png";
export default class MessageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      senderId: "",
      receiverId: "",
      timeStamp: "",
      msgType: 1,
      seen: false,
      allChats: [],
      record: "",
      returnData: "",
      userDetails: "",
      otherUserProfileImg: "",
      otherUserUserName: "",
      userName: "",
      userImg: "",
      page: 1,
      interestUserId: [],
      count: 0,
      chatId: "",
      otherUserId: {},
    };
  }

  videoCall = async (id) => {
    return (
      <div className="App">
        <Chat />
      </div>
    );
  };
  componentWillMount = async () => {
    if (this.props.location.state.record) {
      await UserService.getchatDetail(this.props.location.state.record).then(
        (response) => {
          let responseDatass = response.data.data;
          this.setState({ receiverId: responseDatass._id });
          if (responseDatass.dob && responseDatass.dob != "") {
            let d1 = new Date(responseDatass.dob);
            responseDatass.dob = DIFFYRS(d1);
          }
          if (responseDatass.role) {
            let role = JSON.parse(responseDatass.role);
            role.date = moment(parseInt(role.timeStamp)).format("L");
            role.time = moment(parseInt(role.timeStamp)).format("hh:mm a");
            responseDatass.role = role;
          }
          this.loadDetails(responseDatass);
        }
      );
    }
    await UserService.checkLogin().then(async (response) => {
      if (response && response.data.success) {
        this.setState({
          senderId: response.data.data._id,
          userImg: response.data.data.profileImg
            ? response.data.data.profileImg
            : "",
          userName:
            response.data.data.firstName + " " + response.data.data.lastName,
          interestUserId: response.data.data.interestUserId,
        });
      }
    });
    await UserService.getChatId({ receiverId: this.state.receiverId }).then(
      (response) => {
        let responseData = response.data;
        if (responseData.data && responseData.success) {
          this.setState({ chatId: responseData.data._id });
        }
      }
    );
    await this.getMessages(this.state.page);
  };

  componentWillUnmount = async () => {
    console.log(this.state.chatId, this.state.senderId);
  };

  handleChange = (event) => {
    if (event.target.value && event.target.value.trim() !== "") {
      this.setState({ text: event.target.value });
    }
  };

  sendMsg = async (e) => {
    e.preventDefault();
    if (this.state.text !== "") {
      await this.addMsg(this.state);
      this.getMessages(this.state.page);
    }
    this.setState({ text: "" });
  };

  addMsg = async (data) => {
    await UserService.addOrUpdateMsg(data).then(async (response) => {
      if (response.data.data && response.data.success) {
        let chats = firebase.ref("chats/" + response.data.data._id);
        chats.push({
          text: this.state.text,
          image: "",
          video: "",
          favoriteBySender: "",
          favoriteByReeiver: "",
          favSenderTime: new Date().getTime(),
          favReceiverTime: new Date().getTime(),
          trashBySender: "",
          trashByReceiver: "",
          trashSenderTime: new Date().getTime(),
          trashReceiverTime: new Date().getTime(),
          senderId: this.state.senderId,
          receiverId: this.state.receiverId,
          timeStamp: new Date().getTime(),
          seenTime: new Date().getTime(),
          returnData: response.data.data._id,
          msgType: 1,
          seen: false,
        });

        await UserService.getChatId({ receiverId: this.state.receiverId }).then(
          async (response) => {
            if (response.data && response.data.data) {
              let updateCount = {
                reciverMsgCount: 0,
                senderMsgCount: 0,
              };
              if (
                response.data.data.senderId === this.state.senderId &&
                (!response.data.data.chatClickSender ||
                  !response.data.data.chatClickReceiver)
              ) {
                updateCount = {
                  reciverMsgCount: response.data.data.reciverMsgCount
                    ? parseInt(response.data.data.reciverMsgCount) + 1
                    : 1,
                  senderMsgCount: 0,
                };
                this.state.count = this.state.count + 1;
              } else if (
                response.data.data.receiverId === this.state.senderId &&
                (!response.data.data.chatClickSender ||
                  !response.data.data.chatClickReceiver)
              ) {
                updateCount = {
                  senderMsgCount: response.data.data.senderMsgCount
                    ? parseInt(response.data.data.senderMsgCount) + 1
                    : 1,
                  reciverMsgCount: 0,
                };
                this.state.count = this.state.count + 1;
              }
              await this.setState({ count: this.state.count });

              await UserService.updateChat(
                this.state.receiverId,
                updateCount
              ).then((response) => {});
            }
          }
        );
      }
    });
  };

  handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      this.state.page = this.state.page + 1;
      this.getMessages(this.state.page);
    }
  };

  getMessages = async (page) => {
    await UserService.getChatId({ receiverId: this.state.receiverId }).then(
      async (response) => {
        if (response.data.data && response.data.data._id) {
          let records = 4 * page;
          let messages = firebase.ref("chats/" + response.data.data._id);
          messages
            .orderByChild("returnData")
            .equalTo(response.data.data._id)
            .limitToLast(records)
            .on("value", async (snapShot) => {
              let newMessages = [];
              snapShot.forEach((child) => {
                let chatsKey = child.key;
                let message = child.val();
                if (
                  !message.seen &&
                  message.receiverId === this.state.senderId &&
                  response.data.data.chatClickSender &&
                  response.data.data.chatClickReceiver
                ) {
                  messages.child(chatsKey + "/seen").set(true);
                  messages
                    .child(chatsKey + "/seenTime")
                    .set(new Date().getTime());
                }

                message.date = moment(parseInt(message.timeStamp)).format("L");
                message.time = moment(parseInt(message.timeStamp)).format(
                  "hh:mm"
                );
                message.key = chatsKey;
                newMessages.push(message);
              });
              await this.setState({ allChats: newMessages });
            });
        }
      }
    );
  };

  renderMsg = () => {
    return this.state.allChats.map((message, key) =>
      message.senderId === this.state.senderId ? (
        <li key={message.key} className="clearfix odd">
          <div className="evenicons">
            {message.favoriteBySender ? (
              <i
                className="fas fa-bookmark fav"
                title="mark as Unfavorite"
                // onClick={(event) => this.removeFav(message.key, 2)}
              ></i>
            ) : (
              <i
                className="fas fa-bookmark"
                title="mark as favorite"
                // onClick={(event) => this.markFav(message.key, 1)}
              ></i>
            )}
            &nbsp;
            <i
              className="delete-color far fa-trash-alt"
              title="Move to trash"
              // onClick={(event) => this.markDel(message.key)}
            ></i>
          </div>

          <div className="chat-avatar">
            <img
              src={this.state.userImg ? SERVERURL + this.state.userImg : IMG}
              alt="Img"
            />{" "}
            <i>{message.time}</i>
          </div>
          <div className="conversation-text">
            <div className="ctext-wrap">
              <i>{this.state.userName}</i>
              <p>{message.text}</p>
            </div>
          </div>
        </li>
      ) : (
        <li key={message.key} className="clearfix">
          <div className="evenicons">
            {message.favoriteByReeiver ? (
              <i
                className="fas fa-bookmark fav"
                title="mark as Unfavorite"
                // onClick={(event) => this.removeFav(message.key)}
              ></i>
            ) : (
              <i
                className="fas fa-bookmark"
                title="mark as favorite"
                // onClick={(event) => this.markFav(message.key)}
              ></i>
            )}
            &nbsp;
            <i
              className="far fa-trash-alt"
              title="Move to trash"
              // onClick={(event) => this.markDel(message.key)}
            ></i>
          </div>

          <div className="chat-avatar">
            <img
              src={
                this.state.otherUserProfileImg
                  ? SERVERURL + this.state.otherUserProfileImg
                  : IMG
              }
              alt="Img"
            />{" "}
            <i>{message.time}</i>
          </div>
          <div className="conversation-text">
            <div className="ctext-wrap">
              <i>{this.state.otherUserUserName}</i>
              <p>{message.text}</p>
            </div>
          </div>
        </li>
      )
    );
  };

  markFav = async (chatId) => {
    let records = 4 * this.state.page;
    let messages = firebase.ref("chats/" + this.state.chatId);
    messages
      .orderByChild("returnData")
      .equalTo(this.state.chatId)
      .limitToLast(records)
      .on("value", async (snapShot) => {
        snapShot.forEach((child) => {
          let chatsKey = child.key;
          let message = child.val();
          if (chatsKey === chatId) {
            let obj = {};
            if (this.state.senderId === message.senderId) {
              obj = {
                key: "favoriteBySender",
                timeKey: "favSenderTime",
                value: !message.favoriteBySender ? true : false,
              };
            } else if (this.state.senderId === message.receiverId) {
              obj = {
                key: "favoriteByReeiver",
                timeKey: "favReceiverTime",
                value: !message.favoriteByReeiver ? true : false,
              };
            } else {
            }
            messages.child(chatsKey + "/" + obj.key).set(false);
            return false;
          }
        });
      });
  };
  markDel = async (chatId) => {
    console.log(chatId);
    let records = 4 * this.state.page;
    let messages = firebase.ref("chats/" + this.state.chatId);
    messages
      .orderByChild("returnData")
      .equalTo(this.state.chatId)
      .limitToLast(records)
      .on("value", async (snapShot) => {
        snapShot.forEach((child) => {
          let chatsKey = child.key;
          let message = child.val();
          if (chatsKey === chatId) {
            let obj = {};
            if (this.state.senderId === message.senderId) {
              obj = {
                key: "trashBySender",
                timeKey: "trashSenderTime",
                value: !message.favoriteBySender ? true : false,
              };
            } else if (this.state.senderId === message.receiverId) {
              obj = {
                key: "trashByReceiver",
                timeKey: "trashReceiverTime",
                value: !message.favoriteByReeiver ? true : false,
              };
            } else {
            }
            messages.child(chatsKey + "/" + obj.key).set(true);
            return false;
          }
        });
      });
  };
  removeFav = async (chatId) => {
    let records = 4 * this.state.page;
    let messages = firebase.ref("chats/" + this.state.chatId);
    messages
      .orderByChild("returnData")
      .equalTo(this.state.chatId)
      .limitToLast(records)
      .on("value", async (snapShot) => {
        snapShot.forEach((child) => {
          let chatsKey = child.key;
          let message = child.val();
          if (chatsKey === chatId) {
            let obj = {};
            if (this.state.senderId === message.senderId) {
              obj = {
                key: "favoriteBySender",
                timeKey: "favSenderTime",
                value: !message.favoriteBySender ? true : false,
              };
            } else if (this.state.senderId === message.receiverId) {
              obj = {
                key: "favoriteByReeiver",
                timeKey: "favReceiverTime",
                value: !message.favoriteByReeiver ? true : false,
              };
            } else {
            }
            messages.child(chatsKey + "/" + obj.key).set(false);
            return false;
          }
        });
      });
  };
  markDel = async (chatId) => {
    let records = 4 * this.state.page;
    let messages = firebase.ref("chats/" + this.state.chatId);
    messages
      .orderByChild("returnData")
      .equalTo(this.state.chatId)
      .limitToLast(records)
      .on("value", async (snapShot) => {
        snapShot.forEach((child) => {
          let chatsKey = child.key;
          let message = child.val();
          if (chatsKey === chatId) {
            let obj = {};
            if (this.state.senderId === message.senderId) {
              obj = {
                key: "trashBySender",
                timeKey: "trashSenderTime",
                value: !message.favoriteBySender ? true : false,
              };
            } else if (this.state.senderId === message.receiverId) {
              obj = {
                key: "trashByReceiver",
                timeKey: "trashReceiverTime",
                value: !message.favoriteByReeiver ? true : false,
              };
            } else {
            }
            messages.child(chatsKey + "/" + obj.key).set(true);
            return false;
          }
        });
      });
  };

  loadDetails = (data) => {
    this.setState({
      userDetails: data,
      receiverId: data._id,
      timeStamp: new Date().getTime(),
      seen: false,
      otherUserProfileImg: data.profileImg ? data.profileImg : "",
      otherUserUserName: data.firstName + " " + data.lastName,
    });
  };

  removeInterest = async (id) => {
    await UserService.removeInterest(id)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  addInterest = async (id) => {
    let obj = {
      interestUserId: id,
    };
    await UserService.addInterest(obj)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success) {
          showNotification("success", responseData.message);
          this.componentWillMount();
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  goBack = () => {
    this.props.history.push({
      pathname: "/message",
    });
  };

  handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      this.state.page = this.state.page + 1;
      this.getMessages(this.state.page);
    }
  };

  render() {
    const { text, userDetails, interestUserId, receiverId } = this.state;
    return (
      <div>
        <section
          className="pt-150 pb-150 msg-detail custom-tabbing-style"
          style={{
            backgroundImage: "url(" + base + "assets/images/201.png" + ")",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <a className="back-btn" onClick={this.goBack}>
                  <i className="icon-keyboard_arrow_left"></i> &nbsp;Back
                </a>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="card-box border-top mb-0">
                  <h4 className="header-title mb-3">Detail</h4>
                  <div className="inbox-widget slimscroll">
                    <div className="inbox-item-img">
                      <div className="text-center">
                        <img
                          src={
                            userDetails.profileImg
                              ? SERVERURL + userDetails.profileImg
                              : IMG
                          }
                          className="rounded-circle msg-detail-profile-img"
                          alt="image"
                        />
                      </div>
                      <div
                        className={
                          userDetails.isOnline
                            ? "circle online"
                            : "circle offline"
                        }
                      ></div>
                      <p className="mt-3 text-center">
                        {userDetails.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                    <hr />
                    <div className="text">
                      <ul className="pl-0 mb-0">
                        <li className="mb-1">
                          <span className="text-body font-weight-semibold">
                            {" "}
                            <i className="icon-user pr-2"></i>
                            {userDetails.firstName
                              ? userDetails.firstName
                              : ""}{" "}
                            {userDetails.lastName ? userDetails.lastName : ""}
                          </span>
                        </li>
                        <li className="common mb-2">
                          <i className="icon-address-book pr-2"></i>
                          {userDetails.dob
                            ? userDetails.dob + " years,"
                            : ""}{" "}
                          {userDetails.gender ? userDetails.gender : "NA"}
                        </li>
                        <li className="common mb-2">
                          <i className="icon-map-marker pr-2"></i>
                          {userDetails.city ? userDetails.city + "," : ""}{" "}
                          {userDetails.province
                            ? userDetails.province + ","
                            : ""}{" "}
                          {userDetails.country ? userDetails.country : ""}
                        </li>
                        <li className="common mb-2">
                          <i className="icon-calendar pr-2"></i>
                          {userDetails.role
                            ? userDetails.role.date
                              ? userDetails.role.date
                              : ""
                            : ""}
                        </li>

                        <li className="common mb-2 msg">
                          <i className="icon icon-watch"> </i>
                          {userDetails.role
                            ? userDetails.role.time
                              ? userDetails.role.time
                              : ""
                            : ""}
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div className="actions text-center">
                      <a className="action-icon mr-1">
                        {" "}
                        {interestUserId.indexOf(receiverId) != -1 ? (
                          <span className="favorite" title="Remove Interest">
                            <i
                              className="icon-heart"
                              onClick={(event) =>
                                this.removeInterest(receiverId)
                              }
                            ></i>
                          </span>
                        ) : (
                          <span
                            className="unfavorite favorite"
                            title="Show Interest"
                            onClick={(event) => this.addInterest(receiverId)}
                          >
                            <i className="icon-heart"></i>
                          </span>
                        )}
                      </a>
                      <a className="action-icon">
                        {" "}
                        <span className="trash" title="Move to Trash">
                          <i className="icon icon-delete"></i>
                        </span>
                      </a>{" "}
                      <a className="action-icon video-call">
                        {" "}
                        <span className="trash" title="video call">
                          <i
                            /* onClick={(event) =>
                              this.videoCall(this.state.receiverId)
                            } */
                            className="fa fa-video-camera"
                            aria-hidden="true"
                          ></i>
                          {/* {this.videoCall} */}
                        </span>
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-8">
                <div className="card-box border-top mb-0">
                  <h4 className="header-title mb-3">Chat</h4>
                  <div
                    className="chat-conversation"
                    onScroll={this.handleScroll}
                  >
                    <ul className="conversation-list slimscroll">
                      {this.renderMsg()}
                    </ul>
                  </div>
                  <form onSubmit={this.sendMsg}>
                    <div className="row chat-btn-text mt-5">
                      <div className="col-sm-10 pr-0">
                        <input
                          type="text"
                          className="form-control chat-input"
                          value={text}
                          onChange={this.handleChange}
                          placeholder="Enter your text"
                        />
                      </div>
                      <div className="col-sm-2 pl-0">
                        <button
                          type="submit"
                          className="btn text-white btn-send chat-send"
                        >
                          <i className="icon-paper-plane pr-2"></i>Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
