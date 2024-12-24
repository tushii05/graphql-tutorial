import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query{
        users:[User] 
        user(_id:ID!):User
        quotes:[Quote]
        iquote(by:ID!): [Quote]
    }
    type User{
        _id:ID
        firstName:String!
        lastName:String!
        email:String!
        quotes:[Quote]
    }
    type Quote{
        name: String!
        by :ID!
    }

    type Token{
        token:String
    }
    type Mutation{
        signupUser(userNew:UserInput!):User
        signinUser(userSignIn: UserSignInInput!):Token
        createQuote(name:String):String
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
        input UserSignInInput{
            email:String!
            password:String!
    }
 `

export default typeDefs;