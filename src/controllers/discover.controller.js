import Profile from "../models/profile.model.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";

const discoverPeople = async (req, res) => {
  try {
    const user = req.user;

    const myProfile = await Profile.findOne({
      user: user._id,
    });

    if (!myProfile) {
      return handleError(
        res,
        "Please complete your profile first",
        400
      );
    }

    let targetGender;

    if (myProfile.gender === "male") {
      targetGender = "female";
    } else if (myProfile.gender === "female") {
      targetGender = "male";
    }

    const profiles = await Profile.find({
      user: {
        $ne: user._id,
      },
      gender: targetGender,
    }).populate(
      "user",
      "name profileCompleted"
    );

    const filteredProfiles = profiles.filter(
      (profile) => profile.user?.profileCompleted
    );

    console.log("profiles", filteredProfiles);

    return handleSuccess(
      res,
      "People fetched successfully",
      filteredProfiles,
      200
    );

  } catch (error) {
    console.log("error", error);

    return handleError(
      res,
      error.message,
      500
    );
  }
};

export { discoverPeople };