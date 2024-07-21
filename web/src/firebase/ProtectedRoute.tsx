import React, { useContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";
import AccessLevel from "../enums/route.access.level";

// Define the type for the props
interface ProtectedRouteProps {
  children: ReactNode;
  accessLevelReq?: typeof AccessLevel[keyof typeof AccessLevel];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  accessLevelReq = AccessLevel.USER,
  ...rest
}) => {
  const { loading, user, VolUser } = useContext(AuthenticationContext);
  const location = useLocation();

  if (loading) {
    return <div className="loading loading-spinner" />;
  }

  if (user) {
    if (VolUser.role === accessLevelReq || accessLevelReq === AccessLevel.USER) {
      return <>{children}</>;
    }
    return <p>Access Denied!</p>;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
