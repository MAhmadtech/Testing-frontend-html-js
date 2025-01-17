import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Analyse from './analysePage/analyse';
import UserAccessScreen from './accessScreen/loginScreen';
import PasswordReset from './accessScreen/resetPassword';
import BlogPosts from './analysePage/blogpost';
import ReadBlog from './analysePage/readBlog'; // Capitalized component name for consistency

// A custom PrivateRoute wrapper to handle protected routes
function PrivateRoute({ element, isAuthenticated }) {
  console.log('Is authenticated:', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const [LoginCredentials, setLoginCredentials] = useState(false); // Tracks user authentication
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Tracks current language for i18n

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Screen */}
        <Route
          path="/"
          element={
            <UserAccessScreen
              setLoginCredentials={setLoginCredentials}
              setCurrentLanguage={setCurrentLanguage}
            />
          }
        />

        {/* Protected Analyse Route */}
        <Route
          path="/analyse"
          element={
            <PrivateRoute
              isAuthenticated={LoginCredentials}
              element={<Analyse currentLanguage={currentLanguage} />}
            />
          }
        />

        {/* Password Reset */}
        <Route path="/resetPassword" element={<PasswordReset />} />

        {/* Blog Posts */}
        {/* <Route path="/blogposts" element={<BlogPosts />} /> */}

        {/* Read Blog */}
        {/* <Route path="/readblog" element={<ReadBlog />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
