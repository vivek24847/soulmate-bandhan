import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
      required:true
    },

    caste: {
      type: String,
      trim: true,
      required:true

    },

    location: {
      country: String,
      state: String,
      city: String,
    },

    education: {
      type:String,
      trim: true,
    },

    interests:[
      {
        type:String,
        trim:true
      }
    ],

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
     type: String,
     trim: true,
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