/* global document */
import React, { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Error404 from './Error404';
import Game from './Game';
import { SCENES as JUNGLE_SCENES } from './games/jungle/main';

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
      <Route index element={<Home />} />
      <Route path="jungle" element={<Game scenes={JUNGLE_SCENES} />} />
      <Route path="*" element={<Error404 />} />
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
let root: Root | undefined;
document.addEventListener('DOMContentLoaded', () => {
  root = createRoot(rootEl);
  root.render(<App />);
});

const reuseRoot = root as Root;
if (reuseRoot) {
  reuseRoot.render(<App />);
}