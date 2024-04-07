import './App.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import { client } from '@apollo/client';
import { Routes } from './main.jsx';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ApolloProvider>
  );
}

export default App;