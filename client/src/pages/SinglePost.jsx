import React, { useState } from "react";
import { GET_POST } from "../queries/queries";
import { useQuery } from "@apollo/client";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router";
import Post from "./Post";

const SinglePost = ({ match }) => {
  const params = useParams();

  const [fetching, setFetching] = useState(true);
  const postId = params.postId;

  const {
    data: post,
    error,
    loading,
  } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  if (post) {
    console.log("single post", post);
  }

  return (
    <div className='single-post-container'>
      {loading && (
        <div className='single-post-loading-spinner'>
          <ClipLoader />
        </div>
      )}

      {post && <Post post={post.getPost} />}
    </div>
  );
};

export default SinglePost;
