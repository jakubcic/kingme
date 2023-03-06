const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('games')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('games');
        },
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.findOne(params).select('-__v -password').populate('games');
    }
},
    Mutation: {
        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
},

        updateWins: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $inc: { wins: 1, totalGames: 1 } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },

        updateLosses: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $inc: { losses: 1, totalGames: 1 } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
}}





module.exports = resolvers;

