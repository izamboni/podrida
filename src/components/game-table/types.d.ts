interface IGameTable {
  players: string[];
  maxCards: number;
  totalHands: number;
  game: number[];
  totals: Total[];
  expectedTotals: ExpectedTotals[];
  handleExpected: (player: string, id: number, value: number) => void;
  handleActual: (player: string, id: number, value: number) => void;
  calcualteExpected: (cards: number, hand: number) => void;
  calculateTotal: (player: string) => void;
}
