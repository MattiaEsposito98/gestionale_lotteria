import { FaHourglassHalf } from "react-icons/fa"; // Icona countdown

export default function Countdown({ numeri }) {
  if (!Array.isArray(numeri)) return null;

  const numeriOccupati = numeri.filter(n => n.utente_id !== null && n.utente_id !== undefined).length;
  const numeriDisponibili = 90 - numeriOccupati;
  const percentualeRimanente = Math.max((numeriDisponibili / 90) * 100, 0);

  return (
    <div
      style={{
        position: "absolute",
        top: "89px",
        right: 0,
        padding: "20px",
        background: "linear-gradient(135deg, #c2e9fb, #a1c4fd)",
        borderRadius: "16px",
        width: "220px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 10,
        color: "#333"
      }}
    >
      <div className="text-center mb-2">
        <FaHourglassHalf size={36} color="#007bff" />
        <h5 className="mt-2 fw-bold">Countdown</h5>
        <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {numeriDisponibili} / 90
        </div>
      </div>

      <div className="progress" style={{ height: "10px", borderRadius: "5px" }}>
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{
            width: `${percentualeRimanente}%`,
            transition: "width 0.6s ease"
          }}
          aria-valuenow={percentualeRimanente}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div className="text-center mt-2" style={{ fontSize: "0.9rem" }}>
        {percentualeRimanente === 0
          ? "✅ Completato!"
          : `${Math.round(percentualeRimanente)}% rimanente`}
      </div>
    </div>
  );
}
