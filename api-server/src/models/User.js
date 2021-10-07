//import mongoose, { Schema } from "../../node_modules/mongoose";
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const refreshTokens = mongoose.Schema({
  token: {
    type: String,
    required: true
  }
});

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    refreshTokens: [refreshTokens]
  },
  {
    timestamps: true
  }
);

//mongoose.set("useCreateIndex", true);
UserSchema.index({ name: 1 });
UserSchema.index({ email: 1 });

UserSchema.plugin(uniqueValidator, { message: 'Error, se espera que {PATH} sea único.' });
//UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model("User", UserSchema);
