/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import Message from "../message/message";
import ContactUs from "../contacts/contacts";
import AboutUs from "../about-us/about-us";
import Chat from "../message/videoChat";
import TrashChat from "../message/trash-chat";
import TrashMsgs from "../message/trash-msgs";
import MessageDetail from "../message/message-detail";
import Home from "../home/index";
import Setting from "../setting/setting";
import Plan from "../plan/plan";

import Login from "../login/login";
import Header from "../header/header";
import Footer from "../footer/footer";
import Signup from "../signup/signup";
import Results from "../matches/results";
import TermsConditions from "../static/terms-conditions";
import UserDetails from "../matches/userDetails";
import PrivacyPolicy from "../static/privacy-policy";
import Faq from "../static/faq";
import ProfileSetup from "../profile-setup/profile-setup";
import SearchSetup from "../search/search-setup";
import Intrested from "../activity/intrested-in-me";
import Favourite from "../activity/im-favourite";
import ProfileView from "../activity/profile-view";
import MyFvourite from "../activity/my-favourite";
import MyInterest from "../activity/my-interest";
import BlockList from "../activity/block-list";
import ProfileViewed from "../activity/profile-i-viewed";
import Reviews from "../reviews/reviews";
import MyMatch from "../matches/mymatch";
import { Route, Switch } from "react-router-dom";
import history from "../../history";
import { PrivateRoute } from "../../PrivateRoute";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Route history={history}>
        <Header></Header>
        <Switch>
          <Route path="/reviews" component={Reviews} />
          <Route path="/faq" component={Faq} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/trash-msgs" component={TrashMsgs} />
          <Route path="/trash-chat" component={TrashChat} />
          <Route path="/chat" component={Chat} />
          <Route path="/plans" component={Plan} />
          <Route path="/block-list" component={BlockList} />
          <Route path="/profile-viewed" component={ProfileViewed} />
          <Route path="/my-favourite" component={MyFvourite} />
          <Route path="/my-interest" component={MyInterest} />
          <Route path="/profile-view" component={ProfileView} />
          <Route path="/favourite" component={Favourite} />
          <Route path="/intrested" component={Intrested} />
          <Route path="/message-detail" component={MessageDetail} />

          <Route path="/setting" component={Setting} />

          <Route path="/message" component={Message} />

          <Route path="/privacy" component={PrivacyPolicy} />

          <Route path="/termsConditions" component={TermsConditions} />

          <Route path="/user-details" component={UserDetails} />
          <Route path="/results" component={Results} />
          <Route path="/matches" component={MyMatch} />

          <Route path="/search-setup" component={SearchSetup} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer></Footer>
      </Route>
    );
  }
}
