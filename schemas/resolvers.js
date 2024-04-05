// Import the AuthenticationError class from apollo-server-express
const { AuthenticationError } = require('apollo-server-express');

// Import the User model from the models directory
const { User } = require('../models');

// Import the signToken function from the auth utility
const { signToken } = require('../utils/auth');

// Import the Query class from mongoose (this import is not used and can be removed)
const { Query } = require('mongoose');

// Define the resolvers for the GraphQL server
const resolvers = {
    // Define the resolvers for the Query type
    Query: {
        // Define the resolver for the "me" query
        me: async (parent, args, context) => {
            // If the user is authenticated
            if (context.user) {
                // Find the user in the database and populate their savedBooks field
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                // Return the user data
                return userData;
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Not logged in');
        },
    },
    // Define the resolvers for the Mutation type
    Mutation: {
        // Define the resolver for the "login" mutation
        login: async (parent, { email, password}) => {
            // Find the user in the database with the provided email
            const user = await User.findOne({ email });

            // If the user does not exist, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is not correct, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // Generate a JWT for the user
            const token = signToken(user);

            // Return the token and the user data
            return { token, user };
        },
    },
    Mutation: {
        // Define the resolver for the "addUser" mutation
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // Define the resolver for the "saveBook" mutation
        saveBook: async (parent, {input}, context) => {
            // if the user is authenticated
            if (context.user) {
                // Update the user's savedBooks field with the new book
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {$push: { savedBooks: input} },
                    { new: true}
                ).populate('savedBooks');

                return updatedUser;
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('You need to be logged in to save books');

        },
        // Define the resolver for the "removeBook" mutation
        removeBook: async (parent, {bookId}, context) => {
            // If the user is authenticated
            if (context.user) {
                // Remove the book from the user's savedBooks field
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                ).populate('savedBooks');

                return updatedUser;
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('You need to be logged in to remove books');
        },
    },
    

};

module.exports = resolvers;