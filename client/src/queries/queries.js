import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const GET_USERS = gql`
  {
    getUsers {
      id
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmedPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmedPassword: $confirmedPassword
    ) {
      id
      email
      username
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      username
      id
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePostMutation($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePostMutation($postId: ID!) {
    likePost(postId: $postId) {
      body
      username
      id
    }
  }
`;

export const GET_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      comments {
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
      username
    }
  }
`;

export const FOLLOW = gql`
  mutation followMutation($username: String!) {
    follow(username: $username) {
      username
      id
    }
  }
`;
