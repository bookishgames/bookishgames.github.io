/* global document */
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Set page title for entire app
document.title = 'Bookish Games';

const BASE_URL = '/';
const REDIRECT_PATHNAME_KEY = 'bookish__pathname';

function AppRouting() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <h1>Bookish Games</h1>,
    },
    {
      path: '/jungle',
      element: <h1>Jungle Portal</h1>,
    },
    {
      path: '*',
      element: <><h1>Error 404</h1><p>You might be lost.</p></>,
    }
  ]);

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
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

const rootEl = document.getElementById('root')!;
createRoot(rootEl).render(<AppRouting />);