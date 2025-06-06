import { useEffect, useState } from "react";
import { RegistroDeExercicio, Exercicio } from "../types/treino";
import { carregarHistorico } from "../data/historico";
import { carregarExercicios } from "../data/localStorage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function Historico() {
  const [registros, setRegistros] = useState<RegistroDeExercicio[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [filtroExercicioId, setFiltroExercicioId] = useState('');


  useEffect(() => {
    setRegistros(carregarHistorico());
    setExercicios(carregarExercicios());
  }, []);

  function gerarDadosParaGrafico(): { data: string; volume: number }[] {
  const porDia: Record<string, number> = {};

  registros.forEach((r) => {
    const dia = new Date(r.data).toLocaleDateString();
    porDia[dia] = (porDia[dia] || 0) + r.peso * r.repeticoes;
  });

  return Object.entries(porDia).map(([data, volume]) => ({ data, volume }));
  };

  function getNomeExercicio(id: string): string {
    return exercicios.find((ex) => ex.id === id)?.nome || "Exercício removido";
  }

  const registrosFiltrados = filtroExercicioId
  ? registros.filter((r) => r.exercicioId === filtroExercicioId)
  : registros;

    const registrosOrdenados = [...registrosFiltrados].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );

  function calcularVolumeTotal(registros: RegistroDeExercicio[]): number {
    return registros.reduce((total, r) => total + r.peso * r.repeticoes, 0);
  }

  return (
    <div>
      <h2>Histórico de Treinos</h2>
      {exercicios.length > 0 && (
  <div style={{ marginBottom: '1rem' }}>
    <label>Filtrar por exercício: </label>
    <select
      value={filtroExercicioId}
      onChange={(e) => setFiltroExercicioId(e.target.value)}
    >
      <option value="">Todos</option>
      {exercicios.map((ex) => (
        <option key={ex.id} value={ex.id}>
          {ex.nome}
        </option>
      ))}
    </select>
  </div>
)}
      {registros.length > 0 && (
        <>
            <h3>Evolução do volume por dia</h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gerarDadosParaGrafico()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
            </ResponsiveContainer>
        </>
        )}
      {registros.length === 0 ? (
        <p>Sem registros ainda.</p>
      ) : (
        Object.entries(
          registrosOrdenados.reduce(
            (acc, registro) => {
              const data = new Date(registro.data).toLocaleDateString();
              if (!acc[data]) acc[data] = [];
              acc[data].push(registro);
              return acc;
            },
            {} as Record<string, RegistroDeExercicio[]>,
          ),
        ).map(([data, registrosDoDia]) => (
          <div key={data} style={{ marginBottom: "2rem" }}>
            <h3>{data}</h3>
            <p>
              <strong>Volume total:</strong>{" "}
              {calcularVolumeTotal(registrosDoDia)} kg
            </p>
            <ul>
              {registrosDoDia.map((r, i) => (
                <li key={i}>
                  <strong>{getNomeExercicio(r.exercicioId)}</strong>
                  <br />
                  {r.peso} kg x {r.repeticoes} reps
                  <br />
                  {r.anotacoes && <p>{r.anotacoes}</p>}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Historico;
