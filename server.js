import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";
import jwt from "jsonwebtoken";

mongoose.connect(MONGO_URI)

mongoose.connection.on("connected", () => {
    console.log("connected with Database");
})

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
})


import './models/Quotes.js'
import './models/User.js'
import resolvers from "./resolvers.js";

//this is middleware 
const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, JWT_SECRET);
        return { userId }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
    console.log(`serve run on : ${url}`)
});