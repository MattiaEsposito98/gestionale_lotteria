import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost/gestionale_lotteria/backend/api/logout.php", {}, {
        withCredentials: true
      });

      // Dopo il logout, rimuovi eventuali dati locali
      localStorage.removeItem("loggedInUser");
      navigate("/");
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="public/Lotteria.jpg"
            alt="Lotteria Mida"
            width="60"
            height="60"
          />
        </a>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
