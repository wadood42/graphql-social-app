import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      author {
        username
        id
      }
      comments {
        body
      }
      likes {
        id
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
      followers {
        id
      }
      followings {
        id
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      author {
        username
      }
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
  mutation followMutation($followingId: String!) {
    follow(followingId: $followingId) {
      username
      id
    }
  }
`;

export const UNFOLLOW = gql`
  mutation unfollowMutation($unfollowingId: String!) {
    unfollow(unfollowingId: $unfollowingId) {
      id
      username
    }
  }
`;

export const GET_USER = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      username
      email
      followers {
        id
        followerId
      }
      followings {
        id
        followingId
      }

      id
      posts {
        body
        createdAt
        id
        likes {
          id
        }
        comments {
          id
        }
        author {
          username
          id
        }
      }
      followers {
        id
      }
      followings {
        id
      }
    }
  }
`;
