import { https } from "firebase-functions";
import { graphqlServer } from "./graphql/server";

const server = graphqlServer();

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
const api = https.onRequest(server);

export { api };
