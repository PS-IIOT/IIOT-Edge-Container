import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { User } from './views/User';
import { Admin } from './views/Admin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/user',
                element: <User />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '*',
                element: <User />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
