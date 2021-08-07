import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import Post from "./Post";
import { FETCH_POSTS_QUERY, GET_USERS } from "../queries/queries";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import CreatePost from "../components/CreatePost";
import ClipLoader from "react-spinners/ClipLoader";
import UsersToFollow from "../components/UsersToFollow";
const Home = () => {
  console.log("rendering home");
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const {
    loading: postsLoading,
    error: postError,
    data,
  } = useQuery(FETCH_POSTS_QUERY);

  if (postError) {
    console.log("error", postError.message);
  }

  return (
    <div className='home-container'>
      <div className='side-menu'>SIDE MENU</div>
      <div className='posts-container'>
        <CreatePost />
        {postsLoading && (
          <div className='loading'>
            <ClipLoader color='green' />
          </div>
        )}
        <div className='posts'>
          <h1>Recent Posts</h1>
          {data?.getPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>

        {postError && (
          <div className='errors'>
            <p>{postError.message}</p>
          </div>
        )}
      </div>
      <UsersToFollow />
    </div>
  );
};

export default Home;
