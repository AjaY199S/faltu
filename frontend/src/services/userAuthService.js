/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import * as routes from "../globals/endpoints";
import * as api from "../utils/requests";

export const register = async (body) => {
  return await api
    .PostReq(routes.signupRoute, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const myMatches = async (body) => {
  return await api
    .PostReq(routes.myMatches, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const mutualMatches = async (body) => {
  return await api
    .PostReq(routes.mutualMatches, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const matchId = async (body) => {
  return await api
    .PostReq(routes.matchId, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const unmatchId = async (body) => {
  return await api
    .PostReq(routes.unmatchId, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const login = async (body) => {
  delete body.loading;
  return await api
    .PostReq(routes.userLoginRoute, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const SaveBasicInfo = async (body) => {
  return await api
    .putReq(routes.basicInfo, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const UpdateEducation = async (body) => {
  return await api
    .putReq(routes.updateUserEducation, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateUserPersonality = async (body) => {
  return await api
    .putReq(routes.updateUserPersonality, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const uploadUserImg = async (body) => {
  return await api
    .putReq(routes.uploadUserImg, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getUserPersonality = async (body) => {
  return await api
    .getReq(routes.getUserPersonality, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getSaveSearchList = async () => {
  return await api
    .getReq(routes.savedSearch)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const latestPhotos = async () => {
  return await api
    .getReq(routes.latestPhotos)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const inMyArea = async () => {
  return await api
    .getReq(routes.inMyArea)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const MuslimWomenForMarriage = async () => {
  return await api
    .getReq(routes.MuslimWomenForMarriage)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const userProfileDetail = async () => {
  return await api
    .getReq(routes.userProfileDetail)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateHobbies = async (body) => {
  return await api
    .putReq(routes.updateHobbies, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const userEducationCareerDetail = async () => {
  return await api
    .getReq(routes.userEducationCareerDetail)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getUserHobbies = async (body) => {
  return await api
    .getReq(routes.getUserHobbies, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getMedia = async () => {
  return await api
    .getReq(routes.userMedia)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const checkLogin = async () => {
  return await api
    .getReq(routes.checkLogin)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const saveAdvanceSearch = async (body) => {
  return await api
    .PostReq(routes.saveAdvanceSearch, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getPost = async (body) => {
  return await api
    .PostReq(routes.advanceSearch, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getFirstName = async (body) => {
  return await api
    .PostReq(routes.firstNameSearch, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const MemberNumber = async (body) => {
  return await api
    .PostReq(routes.MemberNumberSearch, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const newMemberSearch = async (body) => {
  return await api
    .getReq(routes.newMemberSearch, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getSaveRecord = async (id) => {
  return await api
    .getReq(routes.savedSearch + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const deleteSaved = async (id) => {
  return await api
    .delReq(routes.deleteSearch + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const userLists = async (limit, page) => {
  return await api
    .getReq(routes.userList + "?pageNo=" + page + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addOrUpdateMsg = async (data) => {
  return await api
    .PostReq(routes.chats, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getChatId = async (data) => {
  return await api
    .PostReq(routes.getChatId, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const logoutUser = async () => {
  return await api
    .getReq(routes.logoutUser)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const profileSetting = async () => {
  return await api
    .getReq(routes.profileSetting)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const settingAdd = async (data) => {
  return await api
    .PostReq(routes.profileSetting, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getNotifiation = async () => {
  return await api
    .getReq(routes.notification)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addNotification = async (data) => {
  return await api
    .PostReq(routes.notification, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateEmail = async (data) => {
  return await api
    .putReq(routes.updateEmail, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const help = async (data) => {
  return await api
    .PostReq(routes.help, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addSubscription = async (data) => {
  return await api
    .PostReq(routes.subscription, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getInterest = async (filter) => {
  return await api
    .getReq(
      routes.interest +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addInterest = async (data) => {
  return await api
    .PostReq(routes.interest, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const removeInterest = async (id) => {
  return await api
    .delReq(routes.interest + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const interestedInMe = async (filter) => {
  return await api
    .getReq(
      routes.interestedInMe +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getFavorite = async (filter) => {
  return await api
    .getReq(
      routes.favorite +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addFavorite = async (data) => {
  return await api
    .PostReq(routes.favorite, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const removeFavorite = async (id) => {
  return await api
    .delReq(routes.favorite + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const favoriteMe = async (filter) => {
  return await api
    .getReq(
      routes.favoriteMe +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getSubPayment = async (data) => {
  return await api
    .getReq(routes.subPayment)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addSubPayment = async (data) => {
  return await api
    .PostReq(routes.subPayment, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getPayments = async () => {
  return await api
    .getReq(routes.subPayment)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addviewPrfoile = async (data) => {
  return await api
    .PostReq(routes.viewProfile, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getviewPrfoile = async (filter) => {
  return await api
    .getReq(
      routes.viewProfile +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getviewedPrfoile = async (filter) => {
  return await api
    .getReq(
      routes.viewedMe +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const blockUser = async (data) => {
  return await api
    .PostReq(routes.blockUser, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const unblockUser = async (id) => {
  return await api
    .delReq(routes.blockUser + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const blockedUser = async (filter) => {
  return await api
    .getReq(
      routes.blockUser +
        "/" +
        filter.type +
        "/" +
        filter.limit +
        "/" +
        filter.offest
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getchatDetail = async (id) => {
  return await api
    .getReq(routes.chatDetail + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getOtherUserMedia = async (id) => {
  return await api
    .getReq(routes.getOtherUserMedia + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateChat = async (receiverId, data) => {
  return await api
    .putReq(routes.updateChat + "/" + receiverId, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const trashUserLists = async (limit, page) => {
  return await api
    .getReq(routes.deleteChat + "?pageNo=" + page + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteChat = async (chatId) => {
  return await api
    .delReq(routes.deleteChat + "/" + chatId)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deletedChat = async (chatId) => {
  return await api
    .delReq(routes.deletedChat + "/" + chatId)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const featuredProfiles = async () => {
  return await api
    .getReq(routes.featuredProfiles)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addReport = async (data) => {
  return await api
    .PostReq(routes.report, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const removeReport = async (reportedUserId) => {
  return await api
    .delReq(routes.report + "/" + reportedUserId)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const saveContacts = async (data) => {
  return await api
    .PostReq(routes.contact, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getFeedback = async (limit, data) => {
  let url = routes.feedback + "?pageNo=" + data.body + "&pageSize=" + limit;
  if (data.rating) {
    url =
      routes.feedback +
      "?pageNo=" +
      data.body +
      "&pageSize=" +
      limit +
      "&rating=" +
      data.rating;
  }
  return await api
    .getReq(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getSingleFeedback = async () => {
  return await api
    .getReq(routes.getSingleReview)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateFeedback = async (data) => {
  return await api
    .putReq(routes.feedback, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
