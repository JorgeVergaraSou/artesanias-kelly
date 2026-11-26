// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contact";
import Navidad from "./pages/Navidad";
import Layout from "./components/Layout";
import { edicionMasReciente } from "./data/navidad";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/navidad"
          element={<Navigate to={`/navidad/${edicionMasReciente.anio}`} replace />}
        />
        <Route path="/navidad/:anio" element={<Navidad />} />
      </Routes>
    </Layout>
  );
}

export default App;
