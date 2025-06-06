import { Exercicio } from "../types/treino";

const KEY = "exercicios";

export function salvarExercicios(exercicios: Exercicio[]) {
  localStorage.setItem(KEY, JSON.stringify(exercicios));
}

export function carregarExercicios(): Exercicio[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}
