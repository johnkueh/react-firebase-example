import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useFirebase } from "../lib/useFirebase";

interface Props {}

const Authed: React.FC<Props> = ({ children }) => {
  const { user } = useFirebase();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      if (user) {
        const token = await user.getIdToken(true);
        setToken(token);
      }
    };
    getToken();
  }, [user]);

  const httpLink = createHttpLink({
    uri: "/api"
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  if (user == null) return <Redirect to="/login" />;
  if (token == null) return <div>Loading...</div>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Authed;
