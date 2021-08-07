import React, { useContext } from "react";
import { FOLLOW } from "../queries/queries";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../contexts/auth";

const Profle = ({ match }) => {
  const { user } = useContext(AuthContext);

  const [follow] = useMutation(FOLLOW, {
    onCompleted: (followedUser) => {
      console.log("followed user", followedUser);
    },
    onError: (error) => {
      console.log("error following user", error);
    },
    variables: { username: user.username },
  });
  return (
    <div className='profile-container'>
      <h1>{match.params.username}</h1>

      <button onClick={follow}>Follow</button>
    </div>
  );
};

export default Profle;
