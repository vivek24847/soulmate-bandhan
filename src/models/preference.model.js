import { Mongoose } from "mongoose";

const preferenceSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: {
      min: {
        type: Number,
        min: 18,
      },

      max: {
        type: Number,
      },
    },

    religions: [String],

    castes: [String],

    locations: [
      {
        country: String,
        state: String,
        city: String,
      },
    ],

    education: [String],

    maritalStatus: [String],

    income: {
      min: Number,
      max: Number,
    },
  },
  {
    timestamps: true,
  })


  const Preference = mongoose.model("Preference", preferenceSchema);
  
  export default Preference;