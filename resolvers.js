import { users, quotes } from './fakedb.js';
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
const User = mongoose.model("User")

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id == id),
        quotes: () => quotes,
        iquote: (_, { by }) => quotes.filter(quote => quote.by == by)
    },
    User: {
        quotes: (ur) => quotes.filter(quote => quote.by == ur.id)
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email });
            if (user) {
                throw new Error("User already exists with that email")
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
                throw new Error("User dosen't exists with that email ")
            }
            const doMatch = await bcrypt.compare(userSignIn.password, user.password);
            if (!doMatch) {
                throw new Error("Email and password invalid")
            }
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            return { token };
        },
        createQuote: async (_, { name }) => {
            
        }
    }
}

export default resolvers;