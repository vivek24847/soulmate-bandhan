import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import User from "./models/user.model.js";
import Profile from "./models/profile.model.js";
import { hashPassword } from "./utils/password.js";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // --------------------------------
    // Dummy data
    // --------------------------------

    const maleNames = [
      "Aarav",
      "Arjun",
      "Aditya",
      "Rahul",
      "Rohan",
      "Karan",
      "Aman",
      "Akash",
      "Varun",
      "Ankit",
    ];

    const femaleNames = [
      "Ananya",
      "Priya",
      "Madhavi",
      "Sneha",
      "Neha",
      "Pooja",
      "Kavya",
      "Simran",
      "Riya",
      "Isha",
    ];

    const religions = [
      "Hindu",
      "Sikh",
      "Muslim",
      "Christian",
    ];

    const castes = [
      "Rajbhar",
      "Brahmin",
      "Rajput",
      "Jat",
      "Khatri",
      "Yadav",
      "Gupta",
      "Arora",
    ];

    const educations = [
      "B.Tech",
      "MBA",
      "MCA",
      "B.Com",
      "M.Com",
      "BBA",
      "M.Tech",
      "MBBS",
    ];

    const occupations = [
      "Software Engineer",
      "Doctor",
      "Teacher",
      "Business Owner",
      "Bank Manager",
      "Designer",
      "Accountant",
      "Marketing Manager",
    ];

    const cities = [
      {
        city: "Chandigarh",
        state: "Chandigarh",
        country: "India",
      },
      {
        city: "Mohali",
        state: "Punjab",
        country: "India",
      },
      {
        city: "Delhi",
        state: "Delhi",
        country: "India",
      },
      {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
      {
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
      {
        city: "Pune",
        state: "Maharashtra",
        country: "India",
      },
      {
        city: "Jaipur",
        state: "Rajasthan",
        country: "India",
      },
      {
        city: "Lucknow",
        state: "Uttar Pradesh",
        country: "India",
      },
    ];

    const interests = [
      "Travel",
      "Music",
      "Movies",
      "Reading",
      "Photography",
      "Cooking",
      "Fitness",
      "Cricket",
      "Gaming",
      "Dancing",
    ];

    // --------------------------------
    // Password
    // --------------------------------

    const hashedPassword = await hashPassword(
      "Test@12345"
    );

    // --------------------------------
    // Generate Users
    // --------------------------------

    const usersData = [];

    for (let i = 0; i < 100; i++) {
      const gender = i < 50 ? "male" : "female";

      const names =
        gender === "male"
          ? maleNames
          : femaleNames;

      const firstName =
        faker.helpers.arrayElement(names);

      const lastName = faker.person.lastName();

      const name = `${firstName} ${lastName}`;

      // Guaranteed unique dummy email
      const email = `dummy_${Date.now()}_${i}@test.com`;

      // Guaranteed unique dummy phone
      const phone = `70000${String(Date.now()).slice(-5)}${String(i).padStart(2, "0")}`;

      usersData.push({
        name,
        email,
        phone,
        password: hashedPassword,
        profileCompleted: true,
      });
    }

    // Insert all users at once
    const createdUsers = await User.insertMany(
      usersData
    );

    console.log(
      `${createdUsers.length} dummy users created`
    );

    // --------------------------------
    // Generate Profiles
    // --------------------------------

    const profilesData = createdUsers.map(
      (user, index) => {
        const gender =
          index < 50 ? "male" : "female";

        const location =
          faker.helpers.arrayElement(cities);

        const profileInterests =
          faker.helpers.arrayElements(
            interests,
            {
              min: 2,
              max: 5,
            }
          );

        return {
          user: user._id,

          gender,

          dateOfBirth:
            faker.date.birthdate({
              min: 23,
              max: 35,
              mode: "age",
            }),

          religion:
            faker.helpers.arrayElement(
              religions
            ),

          caste:
            faker.helpers.arrayElement(
              castes
            ),

          education:
            faker.helpers.arrayElement(
              educations
            ),

          occupation:
            faker.helpers.arrayElement(
              occupations
            ),

          interests: profileInterests,

          location,

          about:
            faker.lorem.sentences({
              min: 2,
              max: 3,
            }),

          photos: [],
        };
      }
    );

    // Insert all profiles at once
    const createdProfiles =
      await Profile.insertMany(profilesData);

    console.log(
      `${createdProfiles.length} dummy profiles created`
    );

    console.log(
      "--------------------------------"
    );
    console.log(
      "Dummy data seeded successfully!"
    );
    console.log(
      "Existing data was NOT modified."
    );
    console.log(
      "--------------------------------"
    );

  } catch (error) {
    console.error(
      "SEED ERROR:",
      error
    );
  } finally {
    await mongoose.connection.close();

    console.log(
      "MongoDB connection closed"
    );
  }
};

seedDatabase();