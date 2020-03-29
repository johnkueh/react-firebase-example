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
      id: ID
      name: String
      description: String
    }

    type Query {
      projects: [Project]
    }
  `;

  const resolvers = {
    Query: {
      projects: async (parent, args, ctx, info) => {
        // console.log(ctx.user);
        const collectionRef = firebaseAdmin
          .firestore()
          .collection("projects")
          .get();
        const collection = (await collectionRef).docs.map((project: any) => {
          return { id: project.id, ...project.data() };
        });
        return collection;
      }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: async ({ req, res }) => {
      const authHeaders = req.headers.authorization;
      const token = authHeaders.replace("Bearer ", "");
      const user = await firebaseAdmin.auth().verifyIdToken(token);
      return {
        user
      };
    }
  });

  const app = express();
  app.use(cors());

  server.applyMiddleware({ app, path: "/", cors: true });

  return app;
}
