const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    followers: [Follower]
    followings: [Following]
    createdAt: String!
  }

  type Follower {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Following {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  # root types: entry points to a GraphQL API (Query, Mutation, Subscription)
  # the schema’s root types determine the shape of the queries and mutations that will be accepted by the server.
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
    getUsers: [User]
  }

  type Mutation {
    register(
      username: String!
      password: String!
      email: String!
      confirmedPassword: String!
    ): User!
    follow(username: String!): User!
    unfollow(username: String!): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
