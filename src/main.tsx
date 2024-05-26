/* global document */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Set page title for entire app
document.title = 'Bookish Games'

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
])

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)