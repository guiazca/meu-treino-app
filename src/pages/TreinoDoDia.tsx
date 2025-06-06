import { useEffect, useState } from 'react';
import { Exercicio, RegistroDeExercicio } from '../types/treino';
import { carregarExercicios } from '../data/localStorage';
import { carregarAgenda } from '../data/agenda';
import { salvarHistorico, carregarHistorico } from '../data/historico';

const dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
const nomeDiaAtual = dias[new Date().getDay()];

const TreinoDoDia = () => {
  const [agendaIds, setAgendaIds] = useState<string[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [registros, setRegistros] = useState<
    Record<string, { peso: number; reps: number; series: number; anotacoes: string }>
  >({});

  useEffect(() => {
    const exs = carregarExercicios();
    const agenda = carregarAgenda();
    setExercicios(exs);
    setAgendaIds(agenda[nomeDiaAtual] || []);
  }, []);

  const handleChange = (
    id: string,
    campo: 'peso' | 'reps' | 'series' | 'anotacoes',
    valor: string | number,
  ) => {
    setRegistros((prev) => ({
      ...prev,
      [id]: { ...prev[id], [campo]: campo === 'anotacoes' ? valor : Number(valor) },
    }));
  };

  const salvar = () => {
    const registrosAntigos = carregarHistorico();
    const novos: RegistroDeExercicio[] = agendaIds.map((id) => ({
      exercicioId: id,
      peso: registros[id]?.peso || 0,
      repeticoes: registros[id]?.reps || 0,
      series: registros[id]?.series || 0,
      anotacoes: registros[id]?.anotacoes || '',
      data: new Date().toISOString(),
    }));
    const atualizados = [...registrosAntigos, ...novos];
    salvarHistorico(atualizados);
    alert('Treino do dia salvo!');
  };

  const exerciciosDoDia = exercicios.filter((e) => agendaIds.includes(e.id));

  return (
    <div>
      <h2>Treino de Hoje ({nomeDiaAtual.charAt(0).toUpperCase() + nomeDiaAtual.slice(1)})</h2>
      {exerciciosDoDia.length === 0 ? (
        <p>Nenhum exercício definido para hoje.</p>
      ) : (
        <>
          {exerciciosDoDia.map((ex) => (
            <div key={ex.id} style={{ marginBottom: '1rem' }}>
              <h4>{ex.nome}</h4>
              {ex.observacoes && (
                <p style={{ fontStyle: 'italic', color: '#ccc' }}>{ex.observacoes}</p>
              )}
              <input
                type="number"
                placeholder="Peso (kg)"
                onChange={(e) => handleChange(ex.id, 'peso', e.target.value)}
              />
              <input
                type="number"
                placeholder="Repetições"
                onChange={(e) => handleChange(ex.id, 'reps', e.target.value)}
              />
              <input
                type="number"
                placeholder="Séries"
                onChange={(e) => handleChange(ex.id, 'series', e.target.value)}
              />
              <textarea
                placeholder="Anotações"
                onChange={(e) => handleChange(ex.id, 'anotacoes', e.target.value)}
              />
            </div>
          ))}
          <button onClick={salvar}>Salvar Treino de Hoje</button>
        </>
      )}
    </div>
  );
};

export default TreinoDoDia;
