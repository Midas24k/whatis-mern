// Import necessary modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');

// Import database connection
const db = require('./config/connection');

// Define the port
const PORT = process.env.PORT || 3001;

// Initialize an Express application
const app = express();

// Initialize an Apollo Server with the imported type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define an async function to start the Apollo Server
const startApolloServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Apply the Apollo middleware to the Express application
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Use Express middleware for parsing JSON and urlencoded form data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // If the application is running in a production environment...
  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the client/build directory
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Respond to any GET request with the index.html file from the client/build directory
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // Once the database is open...
  db.once('open', () => {
    // Start the Express application
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the Apollo Server
startApolloServer();