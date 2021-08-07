const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../utils/check_auth");
const { UserInputError, AuthenticationError } = require("apollo-server");
const {
  validateRegisterInput,
} = require("../../validations/registeration_validations");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}
const { validateLogin } = require("../../validations/login_validation");
module.exports = {
  Query: {
    async getUsers(parent, args, context) {
      console.log("getting all userssssss");
      const user = checkAuth(context);

      if (user) {
        const users = await User.find();
        console.log("getting users", users);
        return users;
      } else {
        throw new AuthenticationError("log in first");
      }
    },
  },
  Mutation: {
    async follow(_, args, context) {
      console.log("following user args", args);
      const user = checkAuth(context);

      if (user) {
        console.log("user for following", args);
      } else {
        throw new AuthenticationError("log in first");
      }
    },
    async login(_, args) {
      const { username, password } = args;
      const { isValid, errors } = validateLogin(args);

      if (!isValid()) {
        throw new UserInputError("Sorry bud", {
          errors,
        });
      }

      const user = await User.findOne({ username: username });

      if (!user) {
        errors.general = "user not found";
        throw new UserInputError("Sorry", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(parent, args, context, info) {
      const { isValid, errors } = validateRegisterInput(args);

      if (!isValid()) {
        throw new UserInputError("sorry", {
          errors,
        });
      }
      const { username, email, password, confirmedPassword } = args;

      const user = await User.findOne({ username: username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "this username is taken",
          },
        });
        ``;
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      const result = await newUser.save();
      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          username: result.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...result._doc,
        id: result.id,
        token,
      };
    },
  },
};
