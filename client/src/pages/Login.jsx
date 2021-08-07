import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";
// import { useForm } from "../hooks/useForm";
import { AuthContext } from "../contexts/auth";
import { Redirect } from "react-router-dom";

const Login = ({ history }) => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { user } = authContext;

  const [login, { loading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      console.log("data from update", userData);
      authContext.login(userData);
    },
    onError(err) {
      console.log("graphql errors", err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { username: username, password: password },
  });

  if (loading) {
    console.log("loading...");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className='form-container'>
      <h1 data-testid='header'>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type='submit'
          value='Login'
          disabled={username === "" || password === ""}
        />
      </form>
      {errors && (
        <ul className='errors'>
          {errors.username && <li>{errors.username.toUpperCase()}</li>}
          {errors.password && <li>{errors.password.toUpperCase()}</li>}
          {errors.general && <li>{errors.general.toUpperCase()}</li>}
        </ul>
      )}
    </div>
  );
};

export default Login;
