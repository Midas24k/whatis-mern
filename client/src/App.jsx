import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server's URI
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
     
        <Navbar />
        <Routes>
          <Route path="*" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Routes>
      
    </ApolloProvider>
  );
}

export default App;