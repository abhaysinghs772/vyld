import mongoose from "mongoose";
import * as moment from "moment"
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type : String,
    required: false,
  },
  age: {
    type : Number,
    required: true,
  },
  signeUp_at: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  deleteAction_date: {
    type: Date,
    required: false,
  },
}, { timestamps: true }); // timestamps to add created_at and updated_at 

const userModel = model('User', userSchema);

export { userModel };