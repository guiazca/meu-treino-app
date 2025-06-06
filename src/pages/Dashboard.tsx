import { useEffect, useState } from "react";
import { Exercicio, RegistroDeExercicio } from "../types/treino";
import { carregarExercicios } from "../data/localStorage";
import RegistroDeTreino from "../components/RegistroDeTreino";
import { carregarHistorico, salvarHistorico } from "../data/historico";

function Dashboard() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [registros, setRegistros] = useState<RegistroDeExercicio[]>([]);

  useEffect(() => {
    const exs = carregarExercicios();
    setExercicios(exs);

    const historico = carregarHistorico();
    setRegistros(historico);
  }, []);

  function adicionarRegistro(reg: RegistroDeExercicio) {
    const atualizado = [...registros, reg];
    setRegistros(atualizado);
    salvarHistorico(atualizado);
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <RegistroDeTreino
        exerciciosDisponiveis={exercicios}
        onRegistrar={adicionarRegistro}
      />

      <h3>Treinos Recentes (teste)</h3>
      <ul>
        {registros.map((r, i) => {
          const exercicio = exercicios.find((e) => e.id === r.exercicioId);
          return (
            <li key={i}>
              {exercicio?.nome || "Exercício desconhecido"} – {r.peso} kg x{" "}
              {r.repeticoes} reps
              <br />
              <small>{new Date(r.data).toLocaleString()}</small>
              {r.anotacoes && <p>{r.anotacoes}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
