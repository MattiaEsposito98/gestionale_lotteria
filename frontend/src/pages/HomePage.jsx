import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [numeri, setNumeri] = useState([]);
  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchNumeri();
  }, []);

  const fetchNumeri = async () => {
    try {
      const res = await axios.get(`${API}/get_numeri.php`);
      setNumeri(res.data);
    } catch (err) {
      console.error("Errore nel caricamento dei numeri", err);
    }
  };

  const handleAssign = async (numero) => {
    const nome = prompt(`Inserisci il nome dell'utente per il numero ${numero}`);
    if (!nome) return;

    try {
      const res = await axios.post(`${API}/assegna_numero.php`, {
        numero,
        utente_nome: nome,
      });

      if (res.data.status === "ok") {
        alert("Numero assegnato!");
        fetchNumeri(); // aggiorna lo stato
      } else {
        alert(res.data.error || "Errore durante l'assegnazione");
      }
    } catch (err) {
      console.error("Errore assegnando numero:", err);
      alert("Errore durante l'assegnazione");
    }
  };

  const renderBalls = () => {
    if (!Array.isArray(numeri)) return null;

    const righe = [];

    for (let r = 0; r < 9; r++) {
      const cols = [];

      for (let i = 1; i <= 10; i++) {
        const num = r * 10 + i;
        const info = numeri.find(n => parseInt(n.numero) === num);
        const assegnato = info?.utente_id !== null && info?.utente_id !== undefined;
        const nomeUtente = info?.nome_utente || "Disponibile";

        cols.push(
          <div key={num} className="d-inline-block mx-2 my-1">
            <div className="ball-wrapper">
              <div
                className={`ball ${assegnato ? 'ball-red' : 'ball-blue'}`}
                onClick={() => !assegnato && handleAssign(num)}
              >
                {num}
              </div>
              {assegnato && (
                <div className="tooltip-custom">Assegnato a: {nomeUtente}</div>
              )}
            </div>
          </div>

        );
      }

      righe.push(
        <div key={r} className="text-center mb-3">
          {cols}
        </div>
      );
    }

    return righe;
  };


  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Numeri disponibili</h2>
      {renderBalls()}
    </div>
  );
}
