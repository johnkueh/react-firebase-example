import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import React, { useEffect, useState } from "react";
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

  if (token == null) return <div>Loading...</div>;

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

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Authed;
