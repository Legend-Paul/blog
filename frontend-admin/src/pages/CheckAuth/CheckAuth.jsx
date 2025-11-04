import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";

export default function CheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // Add Bearer prefix if your backend expects it
    const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    fetch("http://localhost:5000/", {
      headers: {
        Authorization: authHeader, // ← Changed this
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.ok) {
          return response.json(); // ← Parse the response
        } else {
          throw new Error("Authentication failed");
        }
      })
      .then((data) => {
        console.log("Response data:", data); // ← See what you're getting
        if (data.user) {
          // ← Check if user exists in response
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("Authorization");
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
        localStorage.removeItem("Authorization");
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("isAuthenticated:", isAuthenticated);

  if (loading) {
    return <Spinnner />; // ← FIXED: Added return
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
