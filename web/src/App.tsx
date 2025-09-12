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
    firestoreUserDetails?: { role?: string } | null;
  } | null;
  const role = authContext?.firestoreUserDetails?.role as string | undefined;
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
