import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import MainMenu from '@pages/MainMenu';
import NotFound from '@pages/NotFound';
import TestingComponent from '@components/TestComponent';
import AdminUsers from '@pages/AdminUsers';
import { UsersContextProvider } from './context/UserContextProvider';
import Admin from '@pages/Admin';
import AdminEvents from '@pages/AdminEvents';
// import Signup from '@pages/Signup';
// import SignupAdditional from '@pages/SignupAdditional';
// import SignupEmergency from '@pages/SignupEmergency';
import SignUpPage from '@pages/SignUpPage';
import EventContextProvider from './context/EventContextProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: 'register',
    element: <SignUpPage />,
  },
  {
    path: '/testing',
    element: <TestingComponent />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/users',
    element: (
      <UsersContextProvider>
        <AdminUsers />
      </UsersContextProvider>
    ),
  },
  {
    path: '/admin/events',
    element: 
    (<EventContextProvider>
    <AdminEvents />
    </EventContextProvider>),
  },
]);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
