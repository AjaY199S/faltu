/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const Joi = require("joi");
const strictChecking = {
  allowUnknownBody: false,
  allowUnknownHeaders: true,
  allowUnknownQuery: false,
  allowUnknownParams: false,
  allowUnknownCookies: false,
};

const login = {
  options: strictChecking,
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
};

const register = {
  options: strictChecking,
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    phoneNo: Joi.string().required(),
    createdFor: Joi.string().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    country: Joi.string().optional(),
    province: Joi.string().optional(),
    city: Joi.string().optional(),
    role: Joi.string().optional(),
    countryList: Joi.any().optional(),
    citizenship: Joi.string().optional(),
  },
};

const updatePassword = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
  body: {
    newPassword: Joi.string().required(),
    password: Joi.string().required(),
  },
};

const fbLogin = {
  body: {
    access_token: Joi.string().required(),
  },
};

const profileDetail = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
};

const updateProfile = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
};

const signup = {
  options: strictChecking,
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  },
};

const userList = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
  query: {
    pageNo: Joi.number().required(),
    pageSize: Joi.number().optional(),
    countryId: Joi.number().optional(),
  },
};

const updateUser = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
  body: {
    id: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phoneNo: Joi.string().optional(),
    location: Joi.array().optional(),
    freeze: Joi.boolean().optional(),
  },
};

const deleteUser = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
  body: {
    id: Joi.string().required(),
  },
};

const updateUserProfile = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
};
const chats = {
  options: strictChecking,
  headers: {
    authorization: Joi.string().required(),
  },
  body: {
    receiverId: Joi.string().required(),
  },
};

module.exports = {
  login,
  register,
  signup,
  updatePassword,
  profileDetail,
  updateProfile,
  updateUser,
  fbLogin,
  userList,
  deleteUser,
  updateUserProfile,
  chats,
};
