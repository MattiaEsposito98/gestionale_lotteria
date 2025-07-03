import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';


export default function HomePage() {
  const [numeri, setNumeri] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    numero: null,
    nome: '',
    cognome: '',
    data_nascita: '',
    nickname: '',
    email: '',
    cell: ''
  });

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


  // APRE LA MODALE
  const openAssignModal = (numero, info = {}) => {
    setFormData({
      numero,
      nome: info.nome || '',
      cognome: info.cognome || '',
      data_nascita: info.data_nascita || '',
      nickname: info.nickname || '',
      email: info.email || '',
      cell: info.cell || ''
    });
    setShowModal(true);
  };


  // INVIA I DATI
  const handleFormSubmit = async () => {
    const { numero, nome, cognome, data_nascita, nickname, email, cell } = formData;

    if (!nome || !cognome) {
      alert("Nome e cognome sono obbligatori");
      return;
    }

    try {
      console.log("Invio:", {
        numero,
        nome,
        cognome,
        data_nascita,
        nickname,
        email,
        cell
      });

      const res = await axios.post(`${API}assegna_numero.php`, {
        numero,
        nome,
        cognome,
        data_nascita,
        nickname,
        email,
        cell
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.data.status === "ok") {
        alert("Numero assegnato!");
        setShowModal(false);
        fetchNumeri();
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
                onClick={() => openAssignModal(num, info)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assegna numero {formData.numero}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["nome", "cognome", "data_nascita", "nickname", "email", "cell"].map(field => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
                <Form.Control
                  type={field === "data_nascita" ? "date" : "text"}
                  value={formData[field]}
                  onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annulla</Button>
          <Button variant="primary" onClick={handleFormSubmit}>Assegna</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
