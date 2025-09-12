import { ReactNode, useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";

type Props = {
  requiredRole: "admin" | "volunteer";
  children: ReactNode;
};
export default function ProtectedRoute({ requiredRole, children }: Props) {
  const token = useContext(TokenContext);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function verify() {
      try {
        if (!token) {
          if (requiredRole === "volunteer") setIsAllowed(true);
          else setIsAllowed(false);
          return;
        }
        const appUrl = import.meta.env.VITE_API_URL as string;
        const res = await fetch(`${appUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!isMounted) return;
        if (res.ok) {
          const data = await res.json();
          setIsAllowed(requiredRole === "admin" ? data.role === "admin" : true);
        } else {
          setIsAllowed(false);
        }
      } catch (_e) {
        if (!isMounted) return;
        setIsAllowed(false);
      }
    }
    verify();
    return () => {
      isMounted = false;
    };
  }, [token, requiredRole]);

  useEffect(() => {
    if (isAllowed === false) {
      if (requiredRole === "admin") {
        window.location.href = "/dashboard/member";
      } else {
        window.location.href = "/";
      }
    }
  }, [isAllowed, requiredRole]);

  if (isAllowed === null) return null;
  if (isAllowed) return <>{children}</>;
  return null;
}
