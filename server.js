require("dotenv").config();
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {typeDefs,resolvers} from "./schema";
import logger from "morgan";
import {getUser} from "./users/user.utils";

const apollo=new ApolloServer({
  resolvers,
  typeDefs,
  context:async ({req})=>{
    return ({loggedInUser:await getUser(req.headers.token)});
  },
});

const PORT=process.env.PORT;
const app=express();
app.use(logger("tiny"));
app.use("/static",express.static("uploads"));
apollo.applyMiddleware({app});
app.listen({port:PORT},()=>console.log(`Server is running on ${PORT}`));