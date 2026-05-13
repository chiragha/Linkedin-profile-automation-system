import mongoose from "mongoose";

const studentSchema =
  new mongoose.Schema({
    name: String,
    headline: String,
    profileUrl: String,
    college: String,
    location: String,
    graduationYear: String,

    email: {
      type: String,
      default: "Not Available",
    },

    phone: {
      type: String,
      default: "Not Available",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Student = mongoose.model(
  "Student",
  studentSchema
);

export default Student;