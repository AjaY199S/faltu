/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import HeaderAdmin from "../headeradmin/header-admin";
import FooterAdmin from "../footeradmin/footer-admin";
import Dashboard from "../dashboard/dashboard";
import AdminProfile from "../admin-profile/admin-profile";
import AdminUpdateProfile from "../admin-update-profile/admin-update-profile";
import AdminChangePassword from "../admin-change-password/admin-change-password";
import Terms from "../terms/terms";
import Users from "../users/users";
import ReportedUser from "../reported-user/reported-user";
import Payments from "../payments/payments";
import AboutUs from "../about-us/about-us";
import Blogs from "../blogs/blogs";
import FinancialInfo from "../financial-info/financial-info";
import Reports from "../reports/reports";
import ContatUs from "../contact-us/contacts-us";
import Chats from "../chats-messages/chats";
import FeedBack from "../feedback/feedback";
import Sidebar from "../sidebar/sidebar";
import Privacy from "../privacy-policy/privacy";
import { Route, Switch } from "react-router-dom";
import history from "../../../history";
import "./styles.css";

export default class MainAdmin extends React.Component {
  render() {
    return (
      <Route history={history}>
        <HeaderAdmin></HeaderAdmin>
        <Sidebar></Sidebar>
        <Switch>
          <Route path="/admin/feedback" component={FeedBack} />
          <Route path="/admin/chats" component={Chats} />
          <Route path="/admin/contact-us" component={ContatUs} />
          <Route path="/admin/reports" component={Reports} />
          <Route path="/admin/financial-info" component={FinancialInfo} />
          <Route path="/admin/blogs" component={Blogs} />
          <Route path="/admin/payments" component={Payments} />
          <Route path="/admin/reported-users" component={ReportedUser} />
          <Route path="/admin/aboutus" component={AboutUs} />
          <Route path="/admin/policy" component={Privacy} />
          <Route path="/admin/terms" component={Terms} />
          <Route path="/admin/user-list" component={Users} />
          <Route path="/admin/view-profile" component={AdminProfile} />
          <Route path="/admin/update-profile" component={AdminUpdateProfile} />
          <Route
            path="/admin/change-password"
            component={AdminChangePassword}
          />
          <Route path="/admin/privacy-policy" component={Privacy} />
          <Route path="/" component={Dashboard} />
        </Switch>
        <FooterAdmin></FooterAdmin>
      </Route>
    );
  }
}
