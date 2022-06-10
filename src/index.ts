import { Url } from 'url';
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello(name: String!): String!
  }

  type User {
    id: ID!
    username: String!
  }

  type RegisterResponse {
    errors: [Error!]!
    user: User!
  }

  input UserInfo {
    username: String!
    password: String!
  }

  type Mutation {
    register(userInfo: UserInfo): RegisterResponse!
    login(userInfo: UserInfo): Boolean!
  }

  type Error {
    field: String!
    message: String!
  }
`;

const resolvers = {
  Query: {
    hello: (parent: any, { name }: { name: string }) => `Hello, ${name}`
  },
  Mutation: {
    login: () => true,
    register: () => ({
      errors: [
        {
          field: 'field',
          message: 'message'
        }
      ],
      user: {
        id: 1123,
        username: 'dave'
      }
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(3000).then(({ url }: { url: Url }) => console.log(`Server listening on ${url}`));
