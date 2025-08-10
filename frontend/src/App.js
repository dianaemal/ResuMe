import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './AppWrapper'; // Move your logic into a new file

export default function App() {
  return (
    <Router>
    <AppWrapper />
    </Router>
  );
}

