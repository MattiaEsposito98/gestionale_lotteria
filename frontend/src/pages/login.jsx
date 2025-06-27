import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/gestionale_lotteria/backend/api/login.php",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Login fallito");
      }
    } catch (err) {
      setError("Errore nella connessione al server.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Admin</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <input className="form-control my-2" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input className="form-control my-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}
