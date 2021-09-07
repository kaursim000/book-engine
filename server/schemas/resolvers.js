const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('thoughts');
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
    // thoughts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('Book');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
      }
      catch (error) {
        console.log(error)
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { input }, context) => {
      if (context.user) {
        const userAdd = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { addBook: input } },
          { new: true }
        );

        return userAdd;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { input }, context) => {
      if (context.user) {
        const userDelete = await User.findOneAndUpdate(
          {_id: context.user._id },
          { $pull: { addBook: input } },
          { new: true }
        );
        return userDelete
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
