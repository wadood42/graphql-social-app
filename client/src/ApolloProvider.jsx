import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { AuthProvider, AuthContext } from "./contexts/auth";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((request, previousRequest) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Apollo = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  );
};
export default Apollo;
