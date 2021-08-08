import React, { useContext, useEffect } from "react";
import { FOLLOW, GET_USER, UNFOLLOW } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../contexts/auth";
import "../styles/Profile.css";
import Post from "./Post";
import ClipLoader from "react-spinners/ClipLoader";
const Profile = ({ match }) => {
  const { user } = useContext(AuthContext);

  // const {
  //   loading: authedUserLoading,
  //   error: authedUserError,
  //   data: authedUser,
  // } = useQuery(GET_USER, {
  //   variables: { userId: user._id },
  // });

  const {
    loading,
    error,
    data: currentUser,
  } = useQuery(GET_USER, {
    variables: { userId: match.params.userId },
  });

  if (currentUser) {
    console.log("current the user", currentUser);
  }

  const [follow] = useMutation(FOLLOW, {
    onCompleted: (followedUser) => {
      console.log("followed user", followedUser);
    },
    onError: (error) => {
      console.log("error following user", error);
    },
    variables: { followingId: match.params.userId },
  });

  const [unfollow] = useMutation(UNFOLLOW, {
    onCompleted: (unfollowedUser) => {
      console.log("unfollowed user", unfollowedUser);
    },
    onError: (error) => {
      console.log("error unfollowing error", error);
    },
    variables: { unfollowingId: match.params.userId },
  });

  return (
    <div className='profile-container'>
      <div className='user-info'>
        <img src='/images/avatar.png' alt='profile' />

        <p>username: {currentUser?.getUser.username}</p>
        <p>email: {currentUser?.getUser.email}</p>
        <p>followers: {currentUser?.getUser.followers.length}</p>
        <p>followings: {currentUser?.getUser.followings.length}</p>
        <p>Posts: {currentUser?.getUser.posts.length}</p>
      </div>
      <div className='profile-posts'>
        {loading && <ClipLoader />}
        <h1>
          {currentUser?.getUser.username[0].toUpperCase() +
            currentUser?.getUser.username.substring(1)}{" "}
          posts
        </h1>
        {currentUser?.getUser.posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
