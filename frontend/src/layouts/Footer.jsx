export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Gestionale Lotteria – Tutti i diritti riservati</p>
      </div>
    </footer>
  );
}
