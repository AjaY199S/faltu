/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import moment from "moment";
import firebase from "../../../globals/firebase";
import * as UserService from "../../../services/userAuthService";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import {
  ERRORMSG,
  SERVERURL,
  PERPAGE,
  DIFFYRS,
} from "../../../globals/constant";
import base from "../../../globals/base";
const IMG = base + "assets/images/customer.png";

export default class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      count: 0,
      perPage: PERPAGE,
      userInfo: "",
      receiverId: "",
      senderId: "",
      userImg: "",
      userName: "",
      timeStamp: "",
      errored: false,
      allChats: [],
      page: 1,
      text: "",
      msgType: 1,
    };
  }

  componentWillMount = async () => {
    this.chatMemberLists();
    await UserService.checkLogin().then(async (response) => {
      if (response && response.data.success) {
        this.setState({
          senderId: response.data.data._id,
          userImg: response.data.data.profileImg
            ? response.data.data.profileImg
            : "",
          userName:
            response.data.data.firstName + " " + response.data.data.lastName,
        });
      }
    });
  };

  chatMemberLists = (body) => {
    let self = this;
    body = body ? body : 1;
    UserService.userLists(self.state.perPage, body)
      .then((response) => {
        let responseData = response.data;
        if (responseData.success === true) {
          responseData.data.users.map((data) => {
            if (data.dob && data.dob != "") {
              let d1 = new Date(data.dob);
              data.dob = DIFFYRS(d1);
            }
            if (data.role) {
              let role = JSON.parse(data.role);
              role.date = moment(parseInt(role.timeStamp)).format("L");
              role.time = moment(parseInt(role.timeStamp)).format("hh:mm a");
              data.role = role;
            }
          });
          responseData.data.users.sort(function (x, y) {
            if (x.role == "") {
              x.role = { timeStamp: 0 };
            }
            if (y.role == "") {
              y.role = { timeStamp: 0 };
            }
            return x.role.timeStamp - y.role.timeStamp;
          });

          self.setState({ userList: responseData.data.users.reverse() });
          self.setState({
            count: responseData.data.totalCount / self.state.perPage,
          });
        } else {
          showNotification("danger", responseData.message);
        }
      })
      .catch((err) => {
        showNotification("danger", ERRORMSG);
      });
  };

  handleChange = (event) => {
    if (event.target.value && event.target.value.trim() !== "") {
      this.setState({ text: event.target.value });
    }
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    this.chatMemberLists(selected);
  };

  sendMsg = async (e) => {
    e.preventDefault();
    this.setState({ timeStamp: new Date().getTime() });
    if (this.state.text !== "") {
      await this.addMsg(this.state);
      this.getMessages(this.state.page, this.state.receiverId);
      this.chatMemberLists();
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
      this.getMessages(this.state.page, this.state.receiverId);
    }
  };

  getMessages = async (page, receiverId) => {
    this.state.receiverId = receiverId;
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
        } else {
          await this.setState({ allChats: [] });
        }
      }
    );
  };

  renderMsg = () => {
    return this.state.allChats.map((message, key) =>
      message.senderId === this.state.senderId ? (
        <li key={message.key} className="clearfix odd">
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

  render() {
    const { text, perPage, userList, count, page } = this.state;
    return (
      <div className="content-page-admin">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Chat & Message</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="index.php">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="chat-msg.php">Chat & Message</a>
                      </li>
                      <li className="breadcrumb-item active">Index</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="card-box">
                  <h4 className="header-title mb-3">Inbox</h4>

                  <div
                    className="inbox-widget slimscroll"
                    style={{ minHeight: "404px" }}
                  >
                    {userList.map((users, key) => (
                      <div key={key} className="inbox-item">
                        <div className="inbox-item-img">
                          <img
                            src={
                              users.profileImg
                                ? SERVERURL + users.profileImg
                                : IMG
                            }
                            className="rounded-circle"
                            alt=""
                          />
                        </div>
                        <p className="inbox-item-author">
                          {users.firstName ? users.firstName : ""}{" "}
                          {users.lastName ? users.lastName : ""}
                        </p>
                        <p className="inbox-item-text">
                          {users.role
                            ? users.role.text
                              ? users.role.text.length >= 10
                                ? users.role.text.slice(0, 10) + "...."
                                : users.role.text
                              : ""
                            : ""}
                        </p>
                        <p className="inbox-item-date">
                          <a
                            onClick={(event) =>
                              this.getMessages(page, users._id)
                            }
                            className="btn btn-sm btn-link text-info font-13"
                          >
                            {" "}
                            Reply{" "}
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
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
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card-box">
                  <h4 className="header-title mb-3">Chat</h4>

                  <div className="chat-conversation">
                    <ul
                      className="conversation-list slimscroll"
                      style={{ maxHeight: "350px" }}
                    >
                      {this.renderMsg()}
                    </ul>
                    <form onSubmit={this.sendMsg}>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            value={text}
                            onChange={this.handleChange}
                            className="form-control chat-input"
                            placeholder="Enter your text"
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn btn-danger chat-send btn-block waves-effect waves-light"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
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
