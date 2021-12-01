interface IGameTable {
  players: string[];
  maxCards: number;
  totalHands: number;
  handleExpected: (player: string, id: number, value: number) => void;
  handleActual: (player: string, id: number, value: number) => void;
  calcualteExpected: (cards: number, hand: number) => number | string;
  calculateTotal: (player: string) => number;
}
