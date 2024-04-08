const mongoose = require("mongoose");
const express = require("express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { ApolloServer } = require("apollo-server-express");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const DB_USER = "igorDb3133";
  const DB_USER_PASSWORD = "27JLRztA3kq8qdZV";
  const DB_CLUSTER = "igordbfs.pnpsamk.mongodb.net";
  const DB_NAME = "Comp3133_Assignment1";
  const mongodb_atlas_url = `mongodb+srv://igorDb3133:27JLRztA3kq8qdZV@igordbfs.pnpsamk.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose
    .connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((success) => {
      console.log("Success Mongodb connection");
    })
    .catch((err) => {
      console.log("Error Mongodb connection");
    });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
}

startServer();
