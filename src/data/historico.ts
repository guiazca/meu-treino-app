import { RegistroDeExercicio } from "../types/treino";

const KEY = "historico_treinos";

export function salvarHistorico(registros: RegistroDeExercicio[]) {
  localStorage.setItem(KEY, JSON.stringify(registros));
}

export function carregarHistorico(): RegistroDeExercicio[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}
