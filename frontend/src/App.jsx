import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from './pages/HomePage';
import ProtectedRoute from "./components/ProtectedRoute";
import DefaultLayout from "./layouts/DefaultLayout"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pubblica, senza layout */}
        <Route path="/" element={<Login />} />

        {/* Route protette dentro layout */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
