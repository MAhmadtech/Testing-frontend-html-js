import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Analyse from './analysePage/analyse';
import UserAccessScreen from './accessScreen/loginScreen';
import PasswordReset from './accessScreen/resetPassword';

function PrivateRoute({ element, isAuthenticated }) {
  // Log for debugging
  console.log('Is authenticated:', isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const [LoginCredentials, setLoginCredentials] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Screen Route */}
        <Route 
          path="/" 
          element={<UserAccessScreen setLoginCredentials={setLoginCredentials} setCurrentLanguage={setCurrentLanguage} />} 
        />

        {/* Protected Analyse Route */}
        <Route 
          path="/analyse"
          element={<PrivateRoute isAuthenticated={LoginCredentials} element={<Analyse currentLanguage={currentLanguage} />} />} 
        />

        <Route path="/resetPassword" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
