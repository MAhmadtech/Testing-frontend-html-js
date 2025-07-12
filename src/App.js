import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Analyse from './analysePage/analyse';
import UserAccessScreen from './accessScreen/loginScreen';
import PasswordReset from './accessScreen/resetPassword';
import BlogPosts from './analysePage/blogpost';
import readBlog from './analysePage/readBlog';
import LandingPage from './accessScreen/landing_page';
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
        {/* Landing Page Route */}
        <Route 
          path="/" 
          element={<LandingPage currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />} 
        />
        <Route 
          path="/login" 
          element={<UserAccessScreen openTab="login" setLoginCredentials={setLoginCredentials} setCurrentLanguage={setCurrentLanguage} />} 
        />
        <Route 
          path="/signup" 
          element={<UserAccessScreen openTab="signup" setLoginCredentials={setLoginCredentials} setCurrentLanguage={setCurrentLanguage} />} 
        />

        {/* Protected Analyse Route */}
        <Route 
          path="/analyse"
          element={<PrivateRoute isAuthenticated={LoginCredentials} element={<Analyse currentLanguage={currentLanguage} />} />}
        />

        <Route path="/resetPassword" element={<PasswordReset />} />
        {/* <Route path="/readblog" element={<readBlog description={currentLanguage} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
