import bcrypt from "bcryptjs"
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
    Query: {
        users: async () => await User.find({}),
        user: async (_, { _id }) => await User.findOne({ _id }),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
        iquote: async (_, { by }) => await Quote.find({ by })
    },
    User: {
        quotes: async (ur) => await Quote.find({ by: ur._id })
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email });
            if (user) {
                throw new Error("User already exists with that email");
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 10);
            const newUser = new User({
                ...userNew,
                password: hashedPassword
            });
            await newUser.save();

            return newUser;
        },

        signinUser: async (_, { userSignIn }) => {
            const user = await User.findOne({ email: userSignIn.email });
            if (!user) {
                throw new Error("User dosen't exists with that email ");
            }
            const doMatch = await bcrypt.compare(userSignIn.password, user.password);
            if (!doMatch) {
                throw new Error("Email and password invalid");
            }
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            return { token };
        },

        createQuote: async (_, { name }, { userId }) => {
            if (!userId) throw new Error("You must be login");
            const newQuote = new Quote({
                name,
                by: userId
            });
            await newQuote.save();
            return "Quote saved successfully ";
        },

        updateQuote: async (_, { _id, name }, { userId }) => {
            if (!userId) throw new Error("You must be logged in");
            const quote = await Quote.findOne({ _id, by: userId });
            if (!quote) throw new Error("Quote not found or you are not authorized");

            quote.name = name;
            await quote.save();
            return "Quote updated successfully";
        },

        deleteQuote: async (_, { _id }, { userId }) => {
            if (!userId) throw new Error("You must be logged in");
            const quote = await Quote.findOneAndDelete({ _id, by: userId });
            if (!quote) throw new Error("Quote not found or you are not authorized");

            return "Quote deleted successfully";
        },
    }
}

export default resolvers;