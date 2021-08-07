const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    followers: [
      {
        username: String,
        createdAt: String,
      },
    ],
    followings: [
      {
        username: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
