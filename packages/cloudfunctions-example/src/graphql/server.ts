import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";

export function graphqlServer() {
  const typeDefs = gql`
    type Project {
      name: String
      description: String
    }

    type Query {
      projects: [Project]
    }
  `;

  const projects = [
    {
      name: "Harry Potter and the Chamber of Secrets",
      description: "J.K. Rowling"
    },
    {
      name: "Jurassic Park",
      description: "Michael Crichton"
    }
  ];

  const resolvers = {
    Query: {
      projects: () => projects
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });

  const app = express();
  app.use(cors());

  server.applyMiddleware({ app, path: "/", cors: true });

  return app;
}
