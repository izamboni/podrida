import { useState } from 'react';

const useScoreBoard = () => {
  const [expected, setExpected] = useState<Expected[]>([]);
  const [actual, setActual] = useState<Actual[]>([]);

  const players = localStorage.getItem('players')?.split(',') || [];

  const [totals, setTotals] = useState<Total[]>(
    players.map((player) => ({
      player,
      total: 0,
    })),
  );

  const game =
    localStorage
      .getItem('game')
      ?.split(',')
      .map((s) => parseInt(s, 10)) || [];

  const [expectedTotals, setExpectedTotals] = useState<ExpectedTotals[]>(
    game.map((_, id) => ({
      id,
      value: '-',
    })),
  );

  const setMaxCardas = (): number => {
    const maxCards = localStorage.getItem('maxCards');
    if (maxCards === null) {
      return Math.floor(52 / players.length);
    }
    return parseInt(maxCards, 10);
  };
  const maxCards = setMaxCardas();

  const totalHands = game.length + 1;
  const handleExpected = (player: string, id: number, value: number) => {
    if (Number.isNaN(value)) {
      const expectedToRemove = expected.filter((e) => e.id === id && e.player === player)[0];
      if (expectedToRemove) {
        setExpected(
          expected.filter(
            (e) => !(e.id === expectedToRemove.id && e.player === expectedToRemove.player),
          ),
        );
      }
      return;
    }
    const newExpected = expected.filter((e) => e.id === id && e.player === player)[0];
    if (!newExpected) {
      setExpected([...expected, { id, player, value }]);
    }
    if (newExpected) {
      setExpected(expected.map((e) => (e.id === id && e.player === player ? { ...e, value } : e)));
    }
  };

  const handleActual = (player: string, id: number, value: number) => {
    const newActual = actual.filter((e) => e.id === id && e.player === player)[0];
    if (!newActual) {
      setActual([...actual, { id, player, value }]);
    }
    if (newActual) {
      setActual(actual.map((e) => (e.id === id && e.player === player ? { ...e, value } : e)));
    }
  };

  const calcualteExpected = (cards: number, hand: number) => {
    const expects = expected.filter((e) => e.id === hand);
    if (expects.length === 0)
      setExpectedTotals(expectedTotals.map((e) => (e.id === hand ? { ...e, value: '-' } : e)));
    if (expects.length > 0) {
      const expectedValue = expects.reduce((acc, curr) => acc + curr.value, 0);
      const toReturn =
        expectedValue - cards > 0 ? `+${expectedValue - cards}` : expectedValue - cards;
      setExpectedTotals(
        expectedTotals.map((e) => (e.id === hand ? { ...e, value: toReturn.toString() } : e)),
      );
    }
    // return toReturn;
  };

  const calculateTotal = (player: string) => {
    const ex = expected.filter((e) => e.player === player);
    const act = actual.filter((e) => e.player === player);
    let total = 0;
    ex.forEach((e) => {
      const a = act.filter((element) => element.id === e.id)[0];
      if (a) {
        if (a.value === e.value) {
          total += 10;
        } else {
          total -= 10;
        }
        total += a.value;
      }
    });
    setTotals(totals.map((e) => (e.player === player ? { ...e, total } : e)));
  };
  return {
    players,
    game,
    maxCards,
    totalHands,
    handleExpected,
    handleActual,
    calcualteExpected,
    calculateTotal,
    totals,
    expectedTotals,
  };
};

export default useScoreBoard;
