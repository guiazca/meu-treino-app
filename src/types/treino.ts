export type Exercicio = {
  id: string;
  nome: string;
  grupoMuscular: string;
  observacoes?: string;
};


export type RegistroDeExercicio = {
  exercicioId: string;
  peso: number;
  repeticoes: number;
  series?: number;
  data: string;
  anotacoes?: string;
};


export type Treino = {
  id: string;
  data: string; // ISO string
  exercicios: RegistroDeExercicio[];
};

export type TreinoPadrao = {
  [diaDaSemana: string]: string[]; // ex: 'segunda': ['id1', 'id2']
};
