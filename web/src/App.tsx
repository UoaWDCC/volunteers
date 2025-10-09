import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import MainMenu from "@pages/MainMenu";
import NotFound from "@pages/NotFound";
import TestingComponent from "@components/TestComponent";
import SignUpPage from "@pages/SignUpPage";
import RegisterModalErrorContextProvider from "./context/RegisterModalErrorContextProvider";
import RegisterErrorModal from "@components/register/RegisterErrorModal";
import Dashboard from "@pages/Dashboard";
import AuthenticationContextProvider from './context/AuthenticationContextProvider';
import Developers from "@components/main/Developers";
import EventContextProvider from "./context/EventContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "register",
    element: (
      <RegisterModalErrorContextProvider>
        <RegisterErrorModal />
        <SignUpPage />
      </RegisterModalErrorContextProvider>
    ),
  },
  {
    path: "/testing",
    element: <TestingComponent />,
  },
  {
    path: "/dashboard",
    element: (
      <EventContextProvider>
        <Dashboard />
      </EventContextProvider>
    ),
  },
  {
    path: "/developers",
    element: <Developers />,
  },
]);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthenticationContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthenticationContextProvider>
  );
}
