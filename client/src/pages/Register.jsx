import React, { useState, useContext } from "react";
import "../styles/Register.css";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries/queries";
import { AuthContext } from "../contexts/auth";
import { Link, withRouter, Redirect } from "react-router-dom";
const Register = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
  });

  const [addUser, { loading: mutationLoading, errorr: mutationError }] =
    useMutation(REGISTER_USER, {
      // update(proxy, result) {
      //   console.log("results isxxxx", result);
      // },
      update(_, { data: { register: userData } }) {
        console.log("after register data", userData);
        authContext.login(userData);
      },
      onError(err) {
        console.log("mutaion errors", err.graphQLErrors[0].extensions.errors);
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
    });

  if (mutationLoading) {
    console.log("loading");
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const checkFields = () => {
    return (
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.confirmedPassword === ""
    );
  };
  return (
    <div className='form-container'>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          placeholder='Username'
          name='username'
          value={values.username}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={values.email}
          placeholder='Email'
          name='email'
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='password'>Password</label>

        <input
          type='password'
          id='passowrd'
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='confirmed-password'>Confirm password</label>

        <input
          type='password'
          id='confirmed-password'
          placeholder='Confirm password'
          name='confirmedPassword'
          value={values.confirmedPassword}
          onChange={(e) => handleChange(e)}
        />
        <input type='submit' value='Register' disabled={checkFields()} />
        <div className='login-link'>
          <Link to='/'>Login</Link>
        </div>
      </form>
      {mutationLoading && <p>Creating your account</p>}
      {mutationError && <p>Error please try again</p>}
      {errors && (
        <ul className='errors'>
          {errors.username && <li> {errors.username.toUpperCase()}</li>}
          {errors.password && <li>{errors.password.toUpperCase()}</li>}
          {errors.confirmedPassword && (
            <li> {errors.confirmedPassword.toUpperCase()}</li>
          )}
          {errors.email && <li> {errors.email.toUpperCase()}</li>}
        </ul>
      )}
    </div>
  );
};

export default withRouter(Register);
