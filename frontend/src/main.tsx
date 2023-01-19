import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { User } from './views/User';
import { AdminPanel } from './views/AdminPanel';
import { Login } from './views/Login';
import { ErrorLogUser } from './views/ErrorLogUser';

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
                path: '/Login',
                element: <Login />,
            },
            {
                path: '/AdminPanel',
                element: <AdminPanel />,
            },
            {
                path: '/ErrorlogUser',
                element: <ErrorLogUser />,
            },
            {
                path: '*',
                element: <User />,
            },
            {
                path: '',
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
