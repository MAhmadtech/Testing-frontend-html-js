import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Analyse from './analysePage/analyse';
import UserAccessScreen from './accessScreen/loginScreen';
import PasswordReset from './accessScreen/resetPassword';
import BlogPosts from './analysePage/blogpost';
import readBlog from './analysePage/readBlog';

function App() {
  const [LoginCredentials, setLoginCredentials] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Screen Route */}
        <Route 
          path="/" 
          element={<UserAccessScreen setCurrentLanguage={setCurrentLanguage} />} 
        />

        {/* Public Analyse Route (no PrivateRoute anymore) */}
        <Route 
          path="/analyse"
          element={<Analyse currentLanguage={currentLanguage} />} 
        />

        <Route path="/resetPassword" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
