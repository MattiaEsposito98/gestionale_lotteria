import { FaMoneyBillWave } from "react-icons/fa";

export default function Goals2({ numeri }) {
  if (!Array.isArray(numeri)) return null;

  const numeriOccupati = numeri.filter(n => n.utente_id !== null && n.utente_id !== undefined).length;
  const obiettivo = 75;
  const percentuale = Math.min((numeriOccupati / obiettivo) * 100, 100);

  return (
    <div
      style={{
        position: "absolute",
        top: "340px",
        left: 0,
        padding: "20px",
        background: "linear-gradient(135deg, #ffe259, #ffa751)",
        borderRadius: "16px",
        width: "220px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 10,
        color: "#333"
      }}
    >
      <div className="text-center mb-2">
        <FaMoneyBillWave size={36} />
        <h5 className="mt-2 fw-bold">2° Traguardo</h5>
        <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {numeriOccupati} / {obiettivo}
        </div>
      </div>

      <div className="progress" style={{ height: "10px", borderRadius: "5px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{
            width: `${percentuale}%`,
            transition: "width 0.6s ease"
          }}
          aria-valuenow={percentuale}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div className="text-center mt-2" style={{ fontSize: "0.9rem" }}>
        {percentuale === 100
          ? "🎉 Obiettivo raggiunto!"
          : `${Math.round(percentuale)}% completato`}
      </div>
    </div>
  );
}
