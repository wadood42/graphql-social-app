import React from "react";
import "../styles/Post.css";
// import moment from "moment";
import { Link } from "react-router-dom";
import { FaHeart, FaRegCommentDots, FaTrash } from "react-icons/fa";
import { FETCH_POSTS_QUERY, DELETE_POST, LIKE_POST } from "../queries/queries";
import { useMutation } from "@apollo/client";
import ClipLoader from "react-spinners";
import { format } from "timeago.js";
const Post = ({ post }) => {
  const [likePost] = useMutation(LIKE_POST, {
    onCompleted: (likedPost) => {
      console.log("liked post", likedPost);
    },
    onError: (err) => {
      console.log("err after liking post", err);
    },
    variables: { postId: post.id },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });
  const [deletePost, { loading, error }] = useMutation(DELETE_POST, {
    onCompleted: (deletedPost) => {
      console.log("deleted post", deletedPost);
    },
    onError: (err) => {
      console.log("error from deleting post", err);
    },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],

    variables: { postId: post.id },
  });

  return (
    <div className='post'>
      <Link to={`/posts/${post.id}`}>
        <p className='post-username'>{post.username}</p>
        <p className='post-created-at'>{format(post.createdAt)}</p>
        <p className='post-body'>{post.body}</p>
      </Link>
      <div className='post-btns'>
        <div className='like-icon'>
          <span className='like' onClick={likePost}>
            <FaHeart color='red' />
          </span>
          <span className='like-counts'>{post.likes.length}</span>
        </div>
        <div className='comment-icon'>
          <span className='comment'>
            <FaRegCommentDots />
          </span>
          <span className='comment-counts'>{post.comments.length}</span>
        </div>
        <div className='delete-btn' onClick={() => deletePost()}>
          <span className='delete-icon'>
            <FaTrash />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
