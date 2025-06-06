import { TreinoPadrao } from '../types/treino';

const KEY = 'agenda_treinos';

export const salvarAgenda = (agenda: TreinoPadrao) => {
  localStorage.setItem(KEY, JSON.stringify(agenda));
};

export const carregarAgenda = (): TreinoPadrao => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : {};
};
