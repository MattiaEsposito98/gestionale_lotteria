import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");        // <-- stringa
  const [showPassword, setShowPassword] = useState(false); // <-- nuovo stato per l’occhio
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API_URL;



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API}/backend/api/login.php`,
        { username, password },
        { withCredentials: true }
      );


      if (response.data.success) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/homepage";
      }
      else {
        setError(response.data.message || "Login fallito");
      }
    } catch (err) {
      console.error("Errore Axios:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        setError(err.response.data.message || "Login fallito");
      } else {
        setError("Errore nella connessione al server.");
      }
    }

  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-4">Login Admin</h4>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(prev => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" type="submit">Accedi</button>
          </div>
        </form>
      </div>
    </div>


  );
}
