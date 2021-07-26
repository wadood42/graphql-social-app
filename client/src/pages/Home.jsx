import React from "react";
import { useQuery } from "@apollo/client";
import Post from "./Post";
import { FETCH_POSTS_QUERY } from "../queries/queries";

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log("Data", data);
  }
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }
  return (
    <div className='home-container'>
      <h1>Recent Posts</h1>
      <ul className='posts-container'>
        {data &&
          data.getPosts.map((post) => <Post post={post} key={post.id} />)}
      </ul>
    </div>
  );
};

export default Home;
