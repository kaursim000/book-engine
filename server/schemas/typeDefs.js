const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    description: String
    authors: [String]
    title: String
    link: String
    image: String
  }
input addBook{
    bookId: ID!
    authors: [String]
    decription: String
    title: String
    link: String
    image: String
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
