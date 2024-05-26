/* global document */
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from './Game';

import './styles/main.css';

// Set page title for entire app
document.title = 'Bookish Games';

const BASE_URL = '/';
const REDIRECT_PATHNAME_KEY = 'bookish__pathname';

function AppRouting() {
  // Handle redirect on static site
  const navigateTo = useNavigate();
  useEffect(() => {
    const redirectFullPathname = localStorage.getItem(REDIRECT_PATHNAME_KEY);
    if (redirectFullPathname) {
      localStorage.setItem(REDIRECT_PATHNAME_KEY, '');
      const redirectPathname = redirectFullPathname.substring(BASE_URL.length);
      navigateTo(redirectPathname);
    }
  }, [navigateTo]);

  return (
    <Routes>
      <Route index element={<h1>Bookish Games</h1>} />
      <Route path="jungle" element={<Game />} />
      <Route path="*" element={<><h1>Error 404</h1><p>You might be lost.</p></>} />
    </Routes>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </React.StrictMode>
  );
}

const rootEl = document.getElementById('root')!;
createRoot(rootEl).render(<App />);