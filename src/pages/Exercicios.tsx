import { useEffect, useState } from "react";
import { Exercicio } from "../types/treino";
import CadastroExercicio from "../components/CadastroExercicio";
import { carregarExercicios, salvarExercicios } from "../data/localStorage";

function Exercicios() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  useEffect(() => {
    const salvos = carregarExercicios();
    if (salvos.length === 0) {
      // Se estiver vazio, carrega mock
      setExercicios([
        { id: "1", nome: "Supino reto", grupoMuscular: "Peito" },
        { id: "2", nome: "Agachamento livre", grupoMuscular: "Pernas" },
        { id: "3", nome: "Puxada aberta", grupoMuscular: "Costas" },
      ]);
    } else {
      setExercicios(salvos);
    }
  }, []);

  useEffect(() => {
    salvarExercicios(exercicios);
  }, [exercicios]);

  function adicionarExercicio(exercicio: Exercicio) {
    setExercicios((prev) => [...prev, exercicio]);
  }

  function removerExercicio(id: string) {
    setExercicios((prev) => prev.filter((ex) => ex.id !== id));
  }

  return (
    <div>
      <h2>Exercícios Cadastrados</h2>
      <CadastroExercicio onAdd={adicionarExercicio} />
      <ul>
        {exercicios.map((ex) => (
          <li key={ex.id}>
            <strong>{ex.nome}</strong> – {ex.grupoMuscular}
            <button onClick={() => removerExercicio(ex.id)} title="Remover">
            ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Exercicios;
