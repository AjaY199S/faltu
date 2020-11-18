/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const express = require("express");
const router = express.Router();
const access = require("../app/controllers/login.controller.js");
const auth = require("../app/controllers/auth.controller.js");
const admin = require("../app/controllers/admin.controller.js");
const logger = require("../app/common/log");
const user = require("../app/controllers/user.controller");
const profile = require("../app/controllers/profile.controller");
const social = require("../app/controllers/social.controller");
const search = require("../app/controllers/search.controller");
const settings = require("../app/controllers/settings.controller");
const activity = require("../app/controllers/activity.controller");
const reports = require("../app/controllers/report.controller");
const payment = require("../app/controllers/payment.controller");
const blogs = require("../app/controllers/blogs.controller");
const contacts = require("../app/controllers/contacts.controller");
const financial = require("../app/controllers/financial.controller");
const feedback = require("../app/controllers/feedback.controller");
const validate = require("express-validation");
const Validation = require("./validations");

router.post("/login", validate(Validation.login), access.login, logger.setLog);
router.get("/logoutUser", auth.authenticate, access.logoutUser, logger.setLog);

router.post(
  "/register",
  validate(Validation.register),
  access.register,
  logger.setLog
);

router.put(
  "/resetPassword/:token",
  auth.authenticate,
  access.resetPassword,
  logger.setLog
);
router.post("/forgotPassword", access.forgotPassword, logger.setLog);
router.put("/uploadUserImg", auth.authenticate, user.uploadUserImg);
router.get("/media", auth.authenticate, user.media);
router.get("/getOtherUserMedia/:id", auth.authenticate, user.getOtherUserMedia);
router.get("/userExists", auth.authenticate, user.userExists);
router.put(
  "/updatePassword",
  validate(Validation.updatePassword),
  auth.authenticate,
  user.updatePassword,
  logger.setLog
);
router.post("/chats", auth.authenticate, user.chats);
router.post("/getChatId", auth.authenticate, user.getChatId);
router.put("/updateChat/:receiverId", auth.authenticate, user.updateChat);
router.put("/deleteChat/:receiverId", auth.authenticate, user.updateChat);
router.delete("/deleteChat/:chatId", auth.authenticate, user.deletechat);
router.get("/deleteChat", auth.authenticate, user.deletedChatList);
router.get("/featuredProfiles", user.featuredProfiles);
router.delete(
  "/deletedChat/:chatId",
  auth.authenticate,
  user.removeDeletedChat
);
/* Routers for login using social media*/
router.put("/fbLogin", social.fbLogin);

/* Routers for admin*/
router.put("/staticPage", auth.authenticate, admin.editStaticPage);
router.get("/staticPage", auth.authenticate, admin.getStaticPage);
router.get(
  "/userList",
  validate(Validation.userList),
  auth.authenticate,
  admin.userList
);
router.get(
  "/userLists",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.userList
);
router.get("/chatDetail/:id", auth.authenticate, profile.singleChatDetails);
router.post(
  "/signup",
  validate(Validation.signup),
  access.register,
  logger.setLog
);
router.get(
  "/profileDetail",
  validate(Validation.profileDetail),
  auth.authenticate,
  admin.profileDetail
);
router.put(
  "/updateProfile",
  validate(Validation.updateProfile),
  auth.authenticate,
  admin.updateProfile
);
router.put(
  "/updateUserDetails/:id",
  auth.authenticate,
  admin.updateUserProfile
);
router.delete(
  "/deleteUser",
  validate(Validation.deleteUser),
  auth.authenticate,
  admin.deleteUser
);
router.put(
  "/updateUser",
  validate(Validation.updateUser),
  auth.authenticate,
  admin.updateUser
);

/* Routers for user profile*/
router.put(
  "/updateUserProfile",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.updateUserProfile
);
router.put("/updateEmail", auth.authenticate, profile.updateEmail);
router.get(
  "/userProfileDetail",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.userProfileDetail
);
router.put(
  "/updateUserEducationCareer",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.updateUserEducationCareer
);
router.get(
  "/userEducationCareerDetail",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.userEducationCareerDetail
);
router.put(
  "/updateUserPersonalityProfile",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.updateUserPersonalityProfile
);
router.get(
  "/userPersonalityProfileDetail",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.userPersonalityProfileDetail
);
router.put(
  "/updateUserHobbiesInterest",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.updateUserHobbiesInterest
);
router.get(
  "/userHobbiesInterestDetail",
  validate(Validation.updateUserProfile),
  auth.authenticate,
  profile.userHobbiesInterestDetail
);

/* Routers for Search*/
router.post("/advanceSearch", auth.authenticate, search.advance);
router.post("/saveAdvanceSearch", auth.authenticate, search.saveAdvance);
router.post("/firstNameSearch", auth.authenticate, search.firstName);
router.post("/memberNumberSearch", auth.authenticate, search.memberNumber);
router.post("/myMatches", auth.authenticate, search.myMatches);
router.post("/matchId", auth.authenticate, search.matchId);
router.post("/unmatchId", auth.authenticate, search.unmatchId);
router.post("/mutualMatches", auth.authenticate, search.mutualMatches);

router.get("/newMemberSearch", auth.authenticate, search.newMemberSearch);
router.get("/latestPhotos", auth.authenticate, search.latestPhotosSearch);
router.get("/inMyArea", auth.authenticate, search.inMyAreaSearch);
router.get(
  "/MuslimWomenForMarriage",
  auth.authenticate,
  search.MuslimWomenForMarriage
);
router.get("/savedSearch", auth.authenticate, search.savedSearch);
router.get("/savedSearch/:id", auth.authenticate, search.savedSingleSearch);
router.delete("/deleteSearch/:id", auth.authenticate, search.deleteSearch);

router.post("/profileSetting", auth.authenticate, settings.addProfileSetting);
router.get("/profileSetting", auth.authenticate, settings.getProfileSetting);
router.post("/notification", auth.authenticate, settings.addNotification);
router.get("/notification", auth.authenticate, settings.getNotification);
router.post("/help", auth.authenticate, settings.addHelp);
router.post("/subscription", auth.authenticate, settings.addSubscription);
router.post("/subPayment", auth.authenticate, settings.addSubPayment);
router.get("/subPayment", auth.authenticate, settings.getSubPayment);

router.post("/interest", auth.authenticate, activity.addInterest);
router.get(
  "/interest/:type/:limit/:offest",
  auth.authenticate,
  activity.getInterest
);
router.delete(
  "/interest/:interestUserId",
  auth.authenticate,
  activity.removeInterest
);
router.get(
  "/interestedInMe/:type/:limit/:offest",
  auth.authenticate,
  activity.interestedInMe
);
router.post("/favorite", auth.authenticate, activity.addFavorite);
router.get(
  "/favorite/:type/:limit/:offest",
  auth.authenticate,
  activity.getFavorite
);
router.delete(
  "/favorite/:favoriteUserId",
  auth.authenticate,
  activity.removeFavorite
);
router.get(
  "/favoriteMe/:type/:limit/:offest",
  auth.authenticate,
  activity.favoriteMe
);
router.post("/viewProfile", auth.authenticate, activity.addView);
router.get(
  "/viewProfile/:type/:limit/:offest",
  auth.authenticate,
  activity.getView
);
router.get(
  "/viewedMe/:type/:limit/:offest",
  auth.authenticate,
  activity.viewedMe
);
//block user
router.post("/blockUser", auth.authenticate, activity.blockUser);
router.get(
  "/blockUser/:type/:limit/:offest",
  auth.authenticate,
  activity.getBlocked
);
router.delete(
  "/blockUser/:blockUserId",
  auth.authenticate,
  activity.unblockUser
);
router.post("/report", auth.authenticate, activity.addReport);
router.delete(
  "/report/:reportedUserId",
  auth.authenticate,
  activity.removeReport
);

//report api for admin panel
router.get("/report", auth.authenticate, reports.listReport);
router.get("/report/:id", auth.authenticate, reports.viewReport);
router.delete("/removeReport/:id", auth.authenticate, reports.removeReport);
router.put("/report", auth.authenticate, reports.updateBlock);

//payment api`s for admin panel
router.get("/payment", auth.authenticate, payment.listPayments);
router.get("/payment/:id", auth.authenticate, payment.viewPaymentDetails);
router.delete("/payment/:id", auth.authenticate, payment.removePayment);

//blogs api`s for admin panel
router.post("/blogs", auth.authenticate, blogs.saveBlogs);
router.get("/blogs", auth.authenticate, blogs.blogsList);
router.put("/blogs/:id", auth.authenticate, blogs.updateBlogs);
router.delete("/blogs/:id", auth.authenticate, blogs.removeBlogs);

router.post("/contact", contacts.saveContatUs);
router.get("/contact", auth.authenticate, contacts.contactList);
router.delete("/contact/:id", auth.authenticate, contacts.removeContacts);

router.get("/dashBoardRecord", auth.authenticate, admin.dashBoardRecord);
router.get("/topBrides", auth.authenticate, admin.topBrides);
router.get("/topGrooms", auth.authenticate, admin.topGrooms);
router.get("/sortRegisteredUser", auth.authenticate, admin.sortRegisteredUser);

//financial info api for admin
router.post("/financial", auth.authenticate, financial.addFinancialInfo);
router.get("/financial", auth.authenticate, financial.listFinancial);
router.put("/financial/:id", auth.authenticate, financial.updateInfo);
router.delete("/financial/:id", auth.authenticate, financial.deleteRecord);

//feedback api for admin as well as web panel
router.post("/feedback", auth.authenticate, feedback.addFeedBack);
router.get("/feedback", auth.authenticate, feedback.feedbackLists);
router.put("/feedback", auth.authenticate, feedback.updateFeedback);
router.get("/getSingleReview", auth.authenticate, feedback.getSingleReview);
router.delete("/feedback/:id", auth.authenticate, feedback.deleteRecord);
module.exports = router;
