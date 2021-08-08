import React from "react";
import "../styles/UsersToFollow.css";
import { GET_USERS } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
const UsersToFollow = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading</p>;

  if (data) {
    console.log("data from userstofollow", data);
  }

  return (
    <div className='users-to-follow'>
      <h3 className='header'>Users to Follow</h3>

      {data?.getUsers.map((user) => (
        <div className='user'>
          <Link
            to={{
              pathname: `/${user.id}`,
            }}>
            <p className='username'>{user.username}</p>
          </Link>
          <button className='follow-btn'>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default UsersToFollow;
