import Profile from "../models/profile.model.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import { profileSchema } from "../validations/profile.validations.js";

const profileUpdate = async (req, res) => {
  try {
    const result = profileSchema.safeParse(req.body);
    if (!result.success) {
      handleError(res, result.error.flatten().fieldErrors, 400);
    }

    const data = result.data;

    const user = req.user;

    const profile = await Profile.findOneAndUpdate(
      {
        user: user._id,
      },
      {
        $set: data,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    if (!user.profileCompleted) {
      user.profileCompleted = true;
      await user.save();
    }

    return handleSuccess(res, "Profile updated successfully", profile, 200);
  } catch (error) {
    console.log("error", error);
    handleError(res, error, 500);
  }
};

const getMyProfileData = async (req, res) => {
  try {
    const user = req.user;

    const profile = await Profile.findOne({
      user: user._id,
    });

    console.log("profileData", { user, profile });

    const profileData = profile.toObject();

    delete profileData._id;
    delete profileData.user;
    delete profileData.__v;

    const userData = {
      name: user.name,
      ...profileData,
    };

    return handleSuccess(
      res,
      "Profile data fetched successfully",
      userData,
      200,
    );
  } catch (error) {
    console.log("error", error);
    handleError(res, error, 500);
  }
};

export { profileUpdate, getMyProfileData };
