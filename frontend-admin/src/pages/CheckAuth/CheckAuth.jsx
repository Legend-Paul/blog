import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";

const API_BASE_URL = "https://blog-backend-tf6n.onrender.com";

export default function CheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const search = location.search.split("?").at(-1);
  let searchParams = "";
  if (search) searchParams = `?redirectTo=${currentPath}&${search}`;
  else searchParams = `?redirectTo=${currentPath}`;

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // Add Bearer prefix if your backend expects it
    const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    fetch(`${API_BASE_URL}/`, {
      headers: {
        Authorization: authHeader, // ← Changed this
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // ← Parse the response
        } else {
          throw new Error("Authentication failed");
        }
      })
      .then((data) => {
        if (data.user) {
          // ← Check if user exists in response
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("Authorization");
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("Authorization");
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinnner />; // ← FIXED: Added return
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login/${searchParams}`} replace />;
  }

  return <Outlet />;
}
