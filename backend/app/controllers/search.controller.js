/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const responseMessages = require("../../lib/responseMessages");
const user = require("../models/users.model");
const advanceSearch = require("../models/advanceSearch");
const appearancess = require("../models/appearance");
const lifestyle = require("../models/lifestyle");
const religiousbackgrounds = require("../models/religiousBackground");
const services = require("../services/search.service");
const _search = {};
const mongoose = require("mongoose");
const MOMENT = require("moment");

/*  function for user advanced search */
_search.advance = async (req, res) => {
  try {
    let queryField = req.body;
    let appearanceFilter = {};
    if (
      (queryField.minweight && queryField.minweight != "") ||
      (queryField.maxweight && queryField.maxweight != "")
    ) {
      appearanceFilter = Object.assign(appearanceFilter, {
        weight: {
          $gte: queryField.minweight || 0,
          $lte: queryField.maxweight || 1000,
        },
      });
    }
    if (
      (queryField.minheight && queryField.minheight != "") ||
      (queryField.maxheight && queryField.maxheight != "")
    ) {
      appearanceFilter = Object.assign(appearanceFilter, {
        height: {
          $gte: queryField.minheight || 0,
          $lte: queryField.maxheight || 1000,
        },
      });
    }
    if (queryField.bodyType && queryField.bodyType != "") {
      appearanceFilter = Object.assign(appearanceFilter, {
        bodyType: { $in: queryField.bodyType },
      });
    }
    if (
      queryField.theirEthnicityIsMostly &&
      queryField.theirEthnicityIsMostly.length > 0
    ) {
      appearanceFilter = Object.assign(appearanceFilter, {
        ethnicity: { $in: queryField.theirEthnicityIsMostly },
      });
    }
    if (queryField.complexion && queryField.complexion.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        complexion: { $in: queryField.complexion },
      });
    }
    if (
      queryField.considerTheirAppearanceAs &&
      queryField.considerTheirAppearanceAs.length > 0
    ) {
      appearanceFilter = Object.assign(appearanceFilter, {
        considerMyselfAs: { $in: queryField.considerTheirAppearanceAs },
      });
    }
    if (queryField.hairLength && queryField.hairLength.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        hairLength: { $in: queryField.hairLength },
      });
    }
    if (queryField.hairColor && queryField.hairColor.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        hairColor: { $in: queryField.hairColor },
      });
    }
    if (queryField.eyeColor && queryField.eyeColor.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        eyeColor: { $in: queryField.eyeColor },
      });
    }
    if (queryField.eyeWear && queryField.eyeWear.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        eyeWear: { $in: queryField.eyeWear },
      });
    }
    if (queryField.facialHair && queryField.facialHair.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        facialHair: { $in: queryField.facialHair },
      });
    }
    if (queryField.hairType && queryField.hairType.length > 0) {
      appearanceFilter = Object.assign(appearanceFilter, {
        hairType: { $in: queryField.hairType },
      });
    }
    if (
      queryField.physicalAndHealthStatus &&
      queryField.physicalAndHealthStatus.length > 0
    ) {
      appearanceFilter = Object.assign(appearanceFilter, {
        physicalAndHealthStatus: { $in: queryField.physicalAndHealthStatus },
      });
    }

    let appearances = [];
    if (Object.entries(appearanceFilter).length > 0) {
      appearances = await appearancess.find(appearanceFilter, { userId: 1 });
    }
    let lifestyleArr = {};
    if (queryField.doYouDrink && queryField.doYouDrink.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        doYouDrink: { $in: queryField.doYouDrink },
      });
    }

    if (
      queryField.relationshipYouAreLookingFor &&
      queryField.relationshipYouAreLookingFor != ""
    ) {
      lifestyleArr = Object.assign(lifestyleArr, {
        relationshipYouAreLookingFor: {
          $eq: queryField.relationshipYouAreLookingFor,
        },
      });
    }
    if (queryField.doYouSmoke && queryField.doYouSmoke.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        doYouSmoke: { $in: queryField.doYouSmoke },
      });
    }
    if (
      queryField.willingToRelocate &&
      queryField.willingToRelocate.length > 0
    ) {
      lifestyleArr = Object.assign(lifestyleArr, {
        willingToRelocate: { $in: queryField.willingToRelocate },
      });
    }
    if (queryField.maritalStatus && queryField.maritalStatus.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        maritalStatus: { $in: queryField.maritalStatus },
      });
    }
    if (
      queryField.doYouHaveChildren &&
      queryField.doYouHaveChildren.length > 0
    ) {
      lifestyleArr = Object.assign(lifestyleArr, {
        doYouHaveChildren: { $in: queryField.doYouHaveChildren },
      });
    }
    if (queryField.numberOfChildren && queryField.numberOfChildren != "") {
      lifestyleArr = Object.assign(lifestyleArr, {
        numberOfChildren: { $eq: parseInt(queryField.numberOfChildren) } || 0,
      });
    }
    if (queryField.oldestChild && queryField.oldestChild != "") {
      lifestyleArr = Object.assign(lifestyleArr, {
        oldestChild: { $eq: parseInt(queryField.oldestChild) } || 0,
      });
    }
    if (queryField.youngestChild && queryField.youngestChild != "") {
      lifestyleArr = Object.assign(lifestyleArr, {
        youngestChild: { $eq: parseInt(queryField.youngestChild) } || 0,
      });
    }
    if (queryField.wantMoreChild && queryField.wantMoreChild.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        wantMoreChild: { $in: queryField.wantMoreChild },
      });
    }
    if (queryField.eatingHabits && queryField.eatingHabits.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        eatingHabits: { $in: queryField.eatingHabits },
      });
    }
    if (queryField.occupation && queryField.occupation.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        occupation: { $in: queryField.occupation },
      });
    }
    if (queryField.employmentStatus && queryField.employmentStatus.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        employmentStatus: { $in: queryField.employmentStatus },
      });
    }
    if (queryField.annualIncome && queryField.annualIncome.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        annualIncome: { $in: queryField.annualIncome },
      });
    }
    if (queryField.homeType && queryField.homeType.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        homeType: { $in: queryField.homeType },
      });
    }
    if (queryField.livingSituation && queryField.livingSituation.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        livingSituation: { $in: queryField.livingSituation },
      });
    }
    if (queryField.residencyStatus && queryField.residencyStatus.length > 0) {
      lifestyleArr = Object.assign(lifestyleArr, {
        residencyStatus: { $in: queryField.residencyStatus },
      });
    }

    let lifestyles = [];
    if (Object.entries(lifestyleArr).length > 0) {
      lifestyles = await lifestyle.find(lifestyleArr, { userId: 1 });
    }

    let backgroundGround = {};
    if (queryField.nationality && queryField.nationality != "") {
      backgroundGround = Object.assign(backgroundGround, {
        nationality: { $eq: queryField.nationality },
      });
    }
    if (queryField.education && queryField.education != "") {
      backgroundGround = Object.assign(backgroundGround, {
        education: { $eq: queryField.education },
      });
    }
    if (queryField.languageSpoken && queryField.languageSpoken.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        languagesSpoken: { $in: queryField.languageSpoken },
      });
    }
    if (queryField.religion && queryField.religion.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        religion: { $in: queryField.religion },
      });
    }
    if (queryField.bornReverted && queryField.bornReverted.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        bornReverted: { $in: queryField.bornReverted },
      });
    }
    if (queryField.religiousValue && queryField.religiousValue.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        religiousValues: { $in: queryField.religiousValue },
      });
    }
    if (
      queryField.attendReligiousService &&
      queryField.attendReligiousService.length > 0
    ) {
      backgroundGround = Object.assign(backgroundGround, {
        attendReligiousServices: { $in: queryField.attendReligiousService },
      });
    }
    if (queryField.polygamy && queryField.polygamy.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        polygamy: { $in: queryField.polygamy },
      });
    }
    if (queryField.readQuran && queryField.readQuran.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        readQuran: { $in: queryField.readQuran },
      });
    }
    if (queryField.familyValues && queryField.familyValues.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        familyValues: { $in: queryField.familyValues },
      });
    }
    if (queryField.profileCreator && queryField.profileCreator.length > 0) {
      backgroundGround = Object.assign(backgroundGround, {
        profileCreator: { $in: queryField.profileCreator },
      });
    }

    let backgroundData = [];
    if (Object.entries(backgroundGround).length > 0) {
      backgroundData = await religiousbackgrounds.find(backgroundGround, {
        userId: 1,
      });
    }
    const mergedArray = [...backgroundData, ...appearances, ...lifestyles];
    let usersArr = [];
    for (let i in mergedArray) {
      if (!usersArr.includes(mergedArray[i].userId.toString())) {
        usersArr.push(mergedArray[i].userId.toString());
      }
    }

    let usersFilter = {};

    if (queryField.country && queryField.country != "") {
      usersFilter = Object.assign(usersFilter, {
        country: { $eq: queryField.country },
      });
    }
    if (queryField.firstNameSearch && queryField.firstNameSearch != "") {
      usersFilter = Object.assign(usersFilter, {
        firstName: { $regex: queryField.firstNameSearch },
      });
    }
    if (queryField.keywordSearch && queryField.keywordSearch != "") {
      usersFilter = Object.assign(usersFilter, {
        $or: [
          { firstName: { $regex: queryField.keywordSearch } },
          { lastName: { $regex: queryField.keywordSearch } },
          { city: { $regex: queryField.keywordSearch } },
          { country: { $regex: queryField.keywordSearch } },
          { province: { $regex: queryField.keywordSearch } },
        ],
      });
    }

    if (queryField.seeking && queryField.seeking != "") {
      usersFilter = Object.assign(usersFilter, {
        gender: { $eq: queryField.seeking },
      });
    }
    if (queryField.state && queryField.state != "") {
      usersFilter = Object.assign(usersFilter, {
        province: { $eq: queryField.state },
      });
    }
    if (queryField.city && queryField.city != "") {
      usersFilter = Object.assign(usersFilter, {
        city: { $eq: queryField.city },
      });
    }

    let country = [];

    if (queryField.asiaArray) {
      country = country.concat(queryField.asiaArray);
    }

    if (queryField.caribbeanArray) {
      country = country.concat(queryField.caribbeanArray);
    }

    if (queryField.europe1Array) {
      country = country.concat(queryField.caribbeanArray);
    }

    if (queryField.europe2Array) {
      country = country.concat(queryField.caribbeanArray);
    }

    if (queryField.austrailiaNewArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (queryField.latinAmericaArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (queryField.centralAsiaArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (queryField.northAmericaArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (queryField.middleEastArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (queryField.englishSpeakingArray) {
      country = country.concat(queryField.caribbeanArray);
    }

    if (queryField.islandArray) {
      country = country.concat(queryField.caribbeanArray);
    }
    if (
      queryField.asiaArray ||
      queryField.caribbeanArray ||
      queryField.europe1Array ||
      queryField.europe2Array ||
      queryField.austrailiaNewArray ||
      queryField.latinAmericaArray ||
      queryField.centralAsiaArray ||
      queryField.northAmericaArray ||
      queryField.middleEastArray ||
      queryField.englishSpeakingArray ||
      queryField.islandArray
    ) {
      usersFilter = Object.assign(usersFilter, {
        country: { $in: country },
      });
    }
    let date1,
      date = new Date();
    if (queryField.age) {
      let newDate = MOMENT().subtract(queryField.age, "years");
      let startOfYear = MOMENT(newDate._d).toDate();
      let newDate1 = MOMENT(newDate._d).subtract(1, "years");
      let endOfYear = MOMENT(newDate1._d).toDate();
      usersFilter = Object.assign(usersFilter, {
        dob: {
          $lte: startOfYear,
          $gte: endOfYear,
        },
      });
    }
    var last;
    if (queryField.lastActive) {
      var a = queryField.lastActive.charAt(7);

      if (/^[a-zA-Z()]$/.test(a)) {
        if (a == "W") last = "7";
        else last = "365";

        date1.setDate(date.getDate() - last);

        queryField.lastActive = date1;
      } else {
        last = a * 30;
        date1.setDate(date.getDate() - last);

        queryField.lastActive = date1;
      }
    }
    if (queryField.lastActive && queryField.lastActive != "") {
      usersFilter = Object.assign(usersFilter, {
        lastActive: {
          $gte: queryField.lastActive,
          $lte: date,
        },
      });
    }
    if (queryField.seeking && queryField.seeking != "") {
      usersFilter = Object.assign(usersFilter, {
        gender: {
          $eq: queryField.seeking,
        },
      });
    }
    if (queryField.hasPhoto && queryField.hasPhoto != "") {
      usersFilter = Object.assign(usersFilter, {
        profileImg: { $exists: true },
      });
    }
    if (queryField.sortResultsBy && queryField.sortResultsBy != "") {
      if (queryField.sortResultsBy === "createdOn") {
        usersFilter = Object.assign(usersFilter, {
          createdOn: -1,
        });
      } else if (queryField.sortResultsBy === "profileImg") {
        usersFilter = Object.assign(usersFilter, {
          profileImg: { $exists: true },
        });
      } else {
        let last = "7";
        date1.setDate(date.getDate() - last);
        usersFilter = Object.assign(usersFilter, {
          lastActive: {
            $gte: date1,
            $lte: date,
          },
        });
      }
    }
    let result = [];
    if (Object.entries(usersFilter).length === 0 && usersArr.length === 0) {
      result = await user
        .find({ _id: { $ne: req.user_id } })
        .sort({ createdOn: -1 });
    } else if (Object.entries(usersFilter).length > 0 && usersArr.length > 0) {
      if (usersFilter.createdOn && usersArr) {
        delete usersFilter.createdOn;
        result = await user
          .find({
            $and: [
              {
                _id: { $in: usersArr },
              },
              usersFilter,
            ],
          })
          .sort({ createdOn: -1 });
      } else if (usersFilter.profileImg) {
        result = await user
          .find({
            $and: [
              {
                _id: { $in: usersArr },
              },
              usersFilter,
            ],
          })
          .sort({ profileImg: -1 });
      } else {
        result = await user.find({
          $and: [
            {
              _id: { $in: usersArr },
            },
            usersFilter,
          ],
        });
      }
    } else if (Object.entries(usersFilter).length > 0) {
      if (usersFilter.createdOn) {
        result = await user
          .find({ _id: { $ne: req.user_id } })
          .sort({ createdOn: -1 });
      } else if (usersFilter.profileImg) {
        result = await user
          .find({ _id: { $ne: req.user_id } })
          .sort({ profileImg: -1 });
      } else {
        result = await user.find({
          $and: [usersFilter, { _id: { $ne: req.user_id } }],
        });
      }
    } else {
      result = await user.find({
        $and: [
          {
            _id: { $in: usersArr },
          },
          { _id: { $ne: req.user_id } },
        ],
      });
    }
    if (!result) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for save advanced search */
_search.saveAdvance = async (req, res) => {
  try {
    let userId = req.user_id;
    req.body.userId = userId;
    let criteria = {
      _id: mongoose.Types.ObjectId(req.body._id),
      userId: mongoose.Types.ObjectId(userId),
    };
    let dataToSet = req.body;
    let options = {
      upsert: true,
      new: true,
    };
    let saveAdvance = await advanceSearch.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    if (!saveAdvance) {
      res.json({
        success: false,
        message: responseMessages.REGISTRATIONFAILED,
      });
    } else {
      res.json({
        success: true,
        data: responseMessages.DATAADDED,
      });
    }
  } catch (error) {
    throw error;
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for save advanced search */
_search.firstName = async (req, res) => {
  try {
    let queryField = req.body;
    let criteria = {
      firstName: queryField.firstName || { $ne: "" },
      gender: queryField.seeking || { $ne: "" },
      age: queryField.age || { $ne: "" },
      profileImg: { $exists: queryField.profileImg || false },
      lastActive: { $lte: queryField.lastActive || "" },
      country: queryField.country || { $ne: "" },
      province: queryField.province || { $ne: "" },
      citizenship: queryField.citizenship || { $ne: "" },
      city: queryField.city || { $ne: "" },
      country: {
        $cond: [
          queryField.multipleCountry,
          { $all: queryField.multipleCountry },
          { $ne: "" },
        ],
      },
    };
    let sortResultsBy = queryField.sortResultsBy || "createdOn";
    let users = await user.find(criteria).sort({ sortResultsBy: -1 });
    if (!users) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_search.savedSearch = async (req, res, next) => {
  try {
    let userId = mongoose.Types.ObjectId(req.user_id);
    let record = await advanceSearch
      .find({ userId: userId })
      .sort({ updatedOn: -1 });
    if (!record) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: record,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};
_search.savedSingleSearch = async (req, res, next) => {
  try {
    let id = mongoose.Types.ObjectId(req.params.id);
    let record = await advanceSearch.findOne({ _id: id });
    if (!record) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: record,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_search.memberNumber = async (req, res) => {
  try {
    const criteria = {
      memberNumber: req.body.memberNumber,
    };

    let result = await services.memberNumberSearch(criteria);

    if (!result) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_search.nameSearch = async (req, res) => {
  try {
    const criteria = {
      firstName: { $all: req.body.firstName },
      age: { $lte: req.body.lage, $gte: req.body.gage },
      gender: { $all: req.body.gender },
      country: { $all: req.body.country },
      city: { $all: req.body.city },
    };

    let result = await services.FirstnameSearch(criteria);

    if (!result) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_search.newMemberSearch = async (req, res) => {
  let result = await services.newMemberSearch(req.user_id);
  res.json({
    success: true,
    data: result,
  });
};
_search.latestPhotosSearch = async (req, res) => {
  let result = await services.latestPhotosSearch();
  res.json({
    success: true,
    data: result,
  });
};
_search.inMyAreaSearch = async (req, res) => {
  let result = await services.inMyAreaSearch(req.user_id);

  res.json({
    success: true,
    data: result,
  });
};

_search.myMatches = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let result = await services.myMatchesSearch(criteria);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_search.mutualMatches = async (req, res) => {
  let result = await services.mutualMatchesSearch(req.user_id);
  res.json({
    success: true,
    data: result,
  });
};

_search.MuslimWomenForMarriage = async (req, res) => {
  let result = await services.MuslimWomenForMarriage();

  res.json({
    success: true,
    data: result,
  });
};

_search.deleteSearch = async (req, res) => {
  try {
    let result = await advanceSearch.findByIdAndDelete(req.params.id);
    if (!result) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.RECORDDELETE,
      });
    }
  } catch (error) {
    throw error;
  }
};

_search.matchId = async (req, res) => {
  const criteria = {
    matchId: req.body.matchId,
    _id: req.user_id,
    role: "user",
  };

  let result = await services.matchIdSearch(criteria);
  res.json({
    success: true,
  });
};

_search.unmatchId = async (req, res) => {
  const criteria = {
    matchId: req.body.matchId,
    _id: req.user_id,
  };
  let result = await services.unmatchIdSearch(criteria);

  res.json({
    success: true,
  });
};

module.exports = _search;
