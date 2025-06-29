import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios.get(`${API}/api/check_session.php`, {
      withCredentials: true
    })
      .then(res => {
        setIsAuthenticated(res.data.loggedIn);
        setChecking(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setChecking(false);
      });
  }, []);

  if (checking) return <div>Caricamento...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
}
