import { useState } from "react";
import { Exercicio, RegistroDeExercicio } from "../types/treino";

type Props = {
  exerciciosDisponiveis: Exercicio[];
  onRegistrar: (registro: RegistroDeExercicio) => void;
};

function RegistroDeTreino({ exerciciosDisponiveis, onRegistrar }: Props) {
  const [exercicioId, setExercicioId] = useState("");
  const [peso, setPeso] = useState(0);
  const [repeticoes, setRepeticoes] = useState(0);
  const [anotacoes, setAnotacoes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!exercicioId || peso <= 0 || repeticoes <= 0) return;

    const novoRegistro: RegistroDeExercicio = {
      exercicioId,
      peso,
      repeticoes,
      data: new Date().toISOString(),
      anotacoes,
    };

    onRegistrar(novoRegistro);

    // Limpar campos
    setExercicioId("");
    setPeso(0);
    setRepeticoes(0);
    setAnotacoes("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Treino</h3>
      <select
        value={exercicioId}
        onChange={(e) => setExercicioId(e.target.value)}
      >
        <option value="">Escolha um exercício</option>
        {exerciciosDisponiveis.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.nome}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Repetições"
        value={repeticoes}
        onChange={(e) => setRepeticoes(Number(e.target.value))}
      />
      <textarea
        placeholder="Anotações (opcional)"
        value={anotacoes}
        onChange={(e) => setAnotacoes(e.target.value)}
      />
      <button type="submit">Salvar treino</button>
    </form>
  );
}

export default RegistroDeTreino;
