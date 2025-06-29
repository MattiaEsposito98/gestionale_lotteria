import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 bg-info-subtle">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
