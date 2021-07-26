import React from "react";
import "../styles/Post.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
const Post = ({ post }) => {
  const likePost = () => {
    console.log("liked post");
  };
  return (
    <li className='single-post'>
      <Link to={`/posts/${post.id}`}>
        <p className='post-username'>{post.username}</p>
        <p className='post-created-at'>2 hours ago</p>
        <p className='post-body'>{post.body}</p>
      </Link>
      <div className='post-btns'>
        <div className='like-icon'>
          <span className='like'>
            <FaHeart color='red' onClick={likePost} />
          </span>
          <span className='like-counts'>{post.likes.length}</span>
        </div>
        <div className='comment-icon'>
          <span className='comment'>
            <FaRegCommentDots />
          </span>
          <span className='comment-counts'>{post.comments.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Post;
