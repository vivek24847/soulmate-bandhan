import { Mongoose } from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    religion: {
      type: String,
      trim: true,
    },

    caste: {
      type: String,
      trim: true,
    },

    motherTongue: {
      type: String,
      trim: true,
    },

    location: {
      country: String,
      state: String,
      city: String,
    },

    education: {
      qualification: String,
      field: String,
      college: String,
    },

    photos: [
    {
      url: {
        type: String,
        required: true
      },

      isPrimary: {
        type: Boolean,
        default: false
      }
    }
  ],

    occupation: {
      title: String,
      company: String,
    },

    about: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  })


  const Profile = mongoose.model("Profile", profileSchema);
  
  export default Profile;