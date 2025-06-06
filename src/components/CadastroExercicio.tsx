import { useState } from "react";
import { Exercicio } from "../types/treino";


type Props = {
  onAdd: (exercicio: Exercicio) => void;
};

function CadastroExercicio({ onAdd }: Props) {
  const [nome, setNome] = useState("");
  const [grupoMuscular, setGrupoMuscular] = useState("");
  const [observacoes, setObservacoes] = useState('');
  
  const novoExercicio: Exercicio = {
  id: crypto.randomUUID(),
  nome,
  grupoMuscular,
  observacoes,
};


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !grupoMuscular) return;

    const novoExercicio: Exercicio = {
      id: crypto.randomUUID(),
      nome,
      grupoMuscular,
    };

    onAdd(novoExercicio);
    setNome("");
    setGrupoMuscular("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Adicionar Exercício</h3>
      <input
        type="text"
        placeholder="Nome do exercício"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grupo muscular"
        value={grupoMuscular}
        onChange={(e) => setGrupoMuscular(e.target.value)}
      />
      <textarea
        placeholder="Observações (ex: cotovelo fechado, tempo de descanso...)"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        />

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default CadastroExercicio;
