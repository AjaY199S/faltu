/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import * as routes from "../globals/endpoints";
import * as api from "../utils/requests";

export const adminProfile = async () => {
  return await api
    .getReq(routes.adminProfile)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const userLists = async (limit, data) => {
  let url = routes.userLists + "?pageNo=" + data.body + "&pageSize=" + limit;
  if (data.countryId) {
    url =
      routes.userLists +
      "?pageNo=" +
      data.body +
      "&pageSize=" +
      limit +
      "&countryId=" +
      data.countryId;
  }
  return await api
    .getReq(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateUserProfile = async (id, body) => {
  return await api
    .putReq(routes.updateUserDetails + "/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updatePassword = async (body) => {
  return await api
    .putReq(routes.updatePassword, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updatePrivacy = async (body) => {
  return await api
    .putReq(routes.staticPage, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const deleteUser = async (body) => {
  return await api
    .delReq(routes.deleteUser, { data: body })
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateTerms = async (body) => {
  return await api
    .putReq(routes.staticPage, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getTerms = async (params) => {
  return await api
    .getReq(routes.staticPage + "?title=" + params.toString())
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const updateAboutUs = async (body) => {
  return await api
    .putReq(routes.staticPage, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getPolicy = async (params) => {
  return await api
    .getReq(routes.staticPage + "?title=" + params.toString())
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getAboutUs = async (params) => {
  return await api
    .getReq(routes.staticPage + "?title=" + params.toString())
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const reportUserList = async (limit, page) => {
  return await api
    .getReq(routes.report + "?pageNo=" + page + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeReport = async (id) => {
  return await api
    .delReq(routes.removeReport + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const paymentUserList = async (limit, page) => {
  return await api
    .getReq(routes.payment + "?pageNo=" + page + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removePayment = async (id) => {
  return await api
    .delReq(routes.payment + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateStatus = async (data) => {
  return await api
    .putReq(routes.report, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const blogsList = async (limit, page) => {
  return await api
    .getReq(routes.blogs + "?pageNo=" + page + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeBlogs = async (id) => {
  return await api
    .delReq(routes.blogs + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateBlogs = async (id, data) => {
  return await api
    .putReq(routes.blogs + "/" + id, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addBlogs = async (data) => {
  return await api
    .PostReq(routes.blogs, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const contactList = async (limit, data) => {
  return await api
    .getReq(routes.contact + "?pageNo=" + data.body + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeContacts = async (id) => {
  return await api
    .delReq(routes.contact + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const dashBoardRecord = async () => {
  return await api
    .getReq(routes.dashBoardRecord)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const topBrides = async () => {
  return await api
    .getReq(routes.topBrides)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const topGrooms = async () => {
  return await api
    .getReq(routes.topGrooms)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const sortRegisteredUser = async () => {
  return await api
    .getReq(routes.sortRegisteredUser)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateProfile = async (data) => {
  return api
    .putReq(routes.updateProfile, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addFinancialInfo = async (data) => {
  return api
    .PostReq(routes.financial, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getFinancial = async (limit, data) => {
  return await api
    .getReq(routes.financial + "?pageNo=" + data + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateFinancial = async (id, data) => {
  return api
    .putReq(routes.financial + "/" + id, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeFinancial = async (id) => {
  return await api
    .delReq(routes.financial + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getFeedback = async (limit, data) => {
  return await api
    .getReq(routes.feedback + "?pageNo=" + data.body + "&pageSize=" + limit)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
