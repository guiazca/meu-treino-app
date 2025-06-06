import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Exercicios from "./pages/Exercicios";
import Historico from "./pages/Historico";
import AgendaSemanal from './pages/AgendaSemanal';
import TreinoDoDia from './pages/TreinoDoDia';


function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/exercicios">Exercícios</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/hoje">Treino de Hoje</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercicios" element={<Exercicios />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/agenda" element={<AgendaSemanal />} />
        <Route path="/hoje" element={<TreinoDoDia />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
