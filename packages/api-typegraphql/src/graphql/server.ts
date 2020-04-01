import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import firebaseAdmin from "../lib/firebase";
import { ProjectResolver } from "../resolvers/ProjectResolver";

export function graphqlServer() {
  const server = new ApolloServer({
    playground: true,
    introspection: true,
    schema: buildSchemaSync({
      resolvers: [ProjectResolver]
    }),
    context: async ({ req, res }) => {
      const authHeaders = req.headers.authorization;
      const token = authHeaders?.replace("Bearer ", "");
      let user = null;
      try {
        user = await firebaseAdmin.auth().verifyIdToken(token!);
      } catch {}

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
