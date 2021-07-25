const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: "./configs/.env" });
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log("Req headers", req.headers);

    return { req };
  },
});

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT).then((res) => {
      console.log(`🚀 server running at ${res.url}`);
    });
  });
