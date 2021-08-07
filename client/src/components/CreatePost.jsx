import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useMutation } from "@apollo/client";
import { CREATE_POST, FETCH_POSTS_QUERY } from "../queries/queries";
import ClipLoader from "react-spinners/ClipLoader";
const CreatePost = ({ client }) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const [createPost, { data, loading, error: mutationError }] = useMutation(
    CREATE_POST,
    {
      refetchQueries: [{ query: FETCH_POSTS_QUERY }],
      onCompleted: (createdPost) => {
        console.log("Created post", createdPost);
      },

      onError: (err) => {
        console.log("mutaion error hahaha", err);
        setError(err);
      },
    }
  );

  if (loading) {
    return (
      <div className='loading'>
        <ClipLoader />
      </div>
    );
  }
  if (mutationError) {
    console.log("sorry error from creating a post", mutationError);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost({ variables: { body: body } });
    setBody("");
    setError("");
  };
  return (
    <div className='create-form'>
      <h3>Create post</h3>
      <form className='create-post' onSubmit={handleSubmit}>
        <textarea
          type='text'
          placeholder='Hi World!'
          name='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input type='submit' value='Share' disabled={body === ""} />
      </form>

      {error && (
        <div className='errors'>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
