import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import company from './gql/company';
import owner from './gql/owner';

const app = express();

app.use(cors());

const typeDefs = gql`
  type Query
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, company.typeDefs, owner.typeDefs],
  resolvers: [company.resolvers, owner.resolvers],
  context: {
    models,
  },
  tracing: true,
});

server.applyMiddleware({ app, path: '/gql' });

const PORT = process.env.PORT || 8000;

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/gql`);

  sequelize.sync({ 
    // force: true
   }).then(() => {
    console.log('🚀🚀🚀 DB synced');
  });
});
