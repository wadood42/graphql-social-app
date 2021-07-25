const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type User {
    type: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  # root types: entry points to a GraphQL API (Query, Mutation, Subscription)
  # the schema’s root types determine the shape of the queries and mutations that will be accepted by the server.
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }

  type Mutation {
    register(
      username: String
      password: String
      email: String
      confirmedPassword: String
    ): User
    login(username: String!, password: String!): User

    createPost(body: String!): Post!
    deletePost(postId: ID!): Post
  }
`;
