const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Number
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID
    description: String
    authors: [String]
    createdAt: String
    title: String
    link: String
    comments: [Comment]!
  }
input addBook{
    bookId: ID!
    authors: [String]
    decription: Sting
    title: String
    link: String
}

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(input: addBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
