export interface Toast {
  id: string;
  number: number;
  name: string;
  date: Date;
  content: "Trash" | "Academic";
  rooms: number;
}

export type ToastDetails = Omit<Toast, "id">;

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  lastToast: number;
}

export type PlayerDetails = Omit<Player, "id">;

export type Points = 15 | 10 | -5;

export interface Buzz {
  player: string;
  points: Points;
}

export interface Question {
  number: number;
  buzzes: Buzz[];
}

export interface Scoresheet {
  toast: string;
  room: number;
  writer: string;
  reader?: string;
  roster: string[];
  questions: Buzz[][];
}

export interface Statline {
  name: string;
  played: number;
  powers: number;
  gets: number;
  negs: number;
  written: number;
  read: number;
  tournaments?: number;
}

export interface Statsheet {
  writer: string;
  stats: Statline[];
}

export interface HistStatline {
  toast: string;
  stats: Statline;
}

export const points = (statline: Statline) =>
  15 * statline.powers +
  10 * statline.gets +
  -5 * statline.negs +
  10 * Math.min(statline.written, 20) +
  5 * Math.min(statline.read, 20);

export const ppg = (statline: Statline) =>
  statline.played > 0
    ? (15 * statline.powers + 10 * statline.gets + -5 * statline.negs) /
      (statline.played / 20)
    : 0;
