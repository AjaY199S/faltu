/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
exports.getFieldFromMsg = errmsg => {
  var field = errmsg.split(":")[2];
  field = field.split(" dup key")[0];
  field = field.substring(0, field.lastIndexOf("_"));
  return field;
};

exports.userProfileModel = user => {
  let obj = {};
  (obj.email = user.email),
    (obj.role = user.role),
    (obj.type = user.type),
    (obj.firstName = user.firstName),
    (obj.lastName = user.lastName),
    (obj.subscription = user.subscription),
    (obj.country = user.country);
  return obj;
};
