// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://unfbwvef3a.execute-api.ap-south-1.amazonaws.com/dev/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
