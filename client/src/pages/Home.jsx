import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import Post from "./Post";
import { FETCH_POSTS_QUERY } from "../queries/queries";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import CreatePost from "../components/CreatePost";
import ClipLoader from "react-spinners/ClipLoader";
const Home = () => {
  console.log("rendering home");
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (error) {
    console.log("error", error.message);
  }

  return (
    <div className='home-container'>
      <CreatePost />

      <h1>Recent Posts</h1>
      {loading && (
        <div className='loading'>
          <ClipLoader color='green' />
        </div>
      )}

      <ul className='posts-container'>
        {data?.getPosts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>

      {error && (
        <div className='errors'>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
