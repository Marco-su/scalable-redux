const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

UserSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

UserSchema.statics.comparePasswords = async (typedPassword, dbPassword) => {
  return await bcrypt.compare(typedPassword, dbPassword);
};

module.exports = model("User", UserSchema);
