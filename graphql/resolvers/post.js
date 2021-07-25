const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check_auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(parent, args) {
      try {
        const post = await Post.findById(args.postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(parent, { body }, context) {
      const user = checkAuth(context);
      console.log("user from create post", user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });

      const savedPost = await newPost.save();
      return savedPost;
    },

    async deletePost(parent, args, context) {
      const user = checkAuth(context);
      console.log("user form deletingpost", user);

      try {
        const post = await Post.findById(args.postId);
        console.log("post to be deleted", post);
        if (user.username === post.username) {
          await post.delete();
          return "Post has been deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error("sorry");
      }
    },
  },
};
