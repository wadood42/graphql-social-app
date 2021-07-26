import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

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
  return (
    <div className='menu container'>
      <CustomLink
        to='/'
        activeOnOnlyExact={true}
        label='Home'
        className='home'
      />
      <CustomLink to='/login' label='Login' className='login' />
      <CustomLink to='/register' label='Register' className='register' />
    </div>
  );
};

export default MenuBar;
