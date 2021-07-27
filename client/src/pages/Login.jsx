import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";
import { useForm } from "../hooks/useForm";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const [login, { data }] = useMutation(LOGIN, {
    onError(err) {
      console.log("graphql errors", err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { username: username, password: password },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    // history.push("/");
  };

  return (
    <div className='form-container'>
      <h1>Login</h1>
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

        <input type='submit' value='Login' />
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
