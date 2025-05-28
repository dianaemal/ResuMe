import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';
import ResumeProvider, { ResumeContext } from './ResumeContext';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/inter'; // Defaults to 400 weight




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <ResumeProvider>
       
          <App /> {/* Your <Routes> are inside App */}
       
      </ResumeProvider>
    
    </AuthProvider>
   
  </React.StrictMode>
);

