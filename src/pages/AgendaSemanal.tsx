import { useEffect, useState } from 'react';
import { carregarExercicios } from '../data/localStorage';
import { salvarAgenda, carregarAgenda } from '../data/agenda';
import { Exercicio, TreinoPadrao } from '../types/treino';

const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

const AgendaSemanal = () => {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [agenda, setAgenda] = useState<TreinoPadrao>({});

  useEffect(() => {
    setExercicios(carregarExercicios());
    setAgenda(carregarAgenda());
  }, []);

  const toggleExercicio = (dia: string, id: string) => {
    setAgenda((prev) => {
      const atual = prev[dia] || [];
      const atualizado = atual.includes(id)
        ? atual.filter((e) => e !== id)
        : [...atual, id];
      return { ...prev, [dia]: atualizado };
    });
  };

  const salvar = () => {
    salvarAgenda(agenda);
    alert('Agenda salva com sucesso!');
  };

  return (
    <div>
      <h2>Agenda Semanal de Treinos</h2>
      {dias.map((dia) => (
        <div key={dia} style={{ marginBottom: '1.5rem' }}>
          <h3>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h3>
          {exercicios.map((ex) => (
            <label key={ex.id} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={agenda[dia]?.includes(ex.id) || false}
                onChange={() => toggleExercicio(dia, ex.id)}
              />
              {' '}{ex.nome}
            </label>
          ))}
        </div>
      ))}
      <button onClick={salvar}>Salvar Agenda</button>
    </div>
  );
};

export default AgendaSemanal;
