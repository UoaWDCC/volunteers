import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useState } from "react";
import MainMenu from "@pages/MainMenu";
import NotFound from "@pages/NotFound";
import TestingComponent from "@components/TestComponent";
import SignUpPage from "@pages/SignUpPage";
import RegisterModalErrorContextProvider from "./context/RegisterModalErrorContextProvider";
import RegisterErrorModal from "@components/register/RegisterErrorModal";
import AuthenticationContextProvider from './context/AuthenticationContextProvider';
import Developers from "@components/main/Developers";
import EventContextProvider from "./context/EventContextProvider";
import DashboardAdminPage from "./pages/DashboardAdminPage";
import DashboardMemberPage from "./pages/DashboardMemberPage";
import AuthenticationContext from "./context/AuthenticationContext";
import { useContext } from "react";
import ProtectedRoute from "./firebase/ProtectedRoute";

function DashboardRoleRedirect() {
  const authContext = useContext(AuthenticationContext) as {
    isUserLoggedIn?: boolean;
    firestoreUserDetails?: { role?: string } | null;
    loading?: boolean;
  } | null;
  
  const { isUserLoggedIn, firestoreUserDetails, loading } = authContext || {};
  const role = firestoreUserDetails?.role as string | undefined;

  // Show loading while auth context is loading
  if (loading) {
    return (
      <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Loading...</h1>
          <p className="text-gray-600">Please wait while we verify your authentication.</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to home page
  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If logged in, redirect based on role
  if (role === 'admin') return <Navigate to="/dashboard/admin" replace />;
  return <Navigate to="/dashboard/member" replace />;
}

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
      <AuthenticationContextProvider>
        <EventContextProvider>
          <DashboardRoleRedirect />
        </EventContextProvider>
      </AuthenticationContextProvider>
    ),
  },
  {
    path: "/dashboard/admin",
    element: (
      <AuthenticationContextProvider>
        <EventContextProvider>
          <ProtectedRoute requiredRole="admin">
            <DashboardAdminPage />
          </ProtectedRoute>
        </EventContextProvider>
      </AuthenticationContextProvider>
    ),
  },
  {
    path: "/dashboard/member",
    element: (
      <AuthenticationContextProvider>
        <EventContextProvider>
          <DashboardMemberPage />
        </EventContextProvider>
      </AuthenticationContextProvider>
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
