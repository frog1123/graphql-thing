import { Url } from 'url';

const { ApolloServer, gql } = require('apollo-server');
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

const schema = loadSchemaSync(join('src', 'schema.gql'), { loaders: [new GraphQLFileLoader()] });
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

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen(3000).then(({ url }: { url: Url }) => console.log(`Server listening on ${url}`));
