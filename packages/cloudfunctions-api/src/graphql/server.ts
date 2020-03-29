import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";
import firebaseAdmin from "firebase-admin";

const serviceAccount = require("../../firebase-key.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://react-firebase-example-cb711.firebaseio.com"
});

export function graphqlServer() {
  const typeDefs = gql`
    type Project {
      name: String
      description: String
    }

    type Query {
      projects: [Project]
    }

    type Mutation {
      verifyToken(token: String!): Boolean
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
    },
    Mutation: {
      verifyToken: async (ctx, input) => {
        const { token } = input;
        console.log("verifyToken", token);
        const data = await firebaseAdmin.auth().verifyIdToken(token);
        console.log(data);
        return true;
      }
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
