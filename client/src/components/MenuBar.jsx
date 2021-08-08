import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const CustomLink = ({ to, label, activeOnOnlyExact, className }) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnOnlyExact,
  });
  return (
    <div className={className}>
      <Link to={to} className={match ? "active" : ""}>
        {label}
      </Link>
    </div>
  );
};
const MenuBar = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;

  const unauthMenu = () => {
    return (
      <div className='menu container'>
        <CustomLink to='/' label='Login' className='login' />
        <CustomLink to='/register' label='Register' className='register' />
      </div>
    );
  };

  const authMenu = () => {
    return (
      <div className='menu container'>
        <CustomLink
          to='/'
          activeOnOnlyExact={true}
          label='Home'
          className='home'
        />
        <CustomLink
          to={`/${user.id}`}
          activeOnOnlyExact={true}
          label={user.username}
          className='profile'
        />

        <button className='logout-btn' onClick={() => logout()}>
          LOGOUT
        </button>
      </div>
    );
  };

  return <>{user ? authMenu() : unauthMenu()}</>;
};

export default MenuBar;
