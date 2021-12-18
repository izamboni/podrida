import { useRouter } from 'next/router';

const useForm = () => {
  const router = useRouter();
  const defaultPlayers = localStorage.getItem('players');
  const initValues =
    defaultPlayers !== undefined
      ? { nroPlayers: 6, maxCards: Math.floor(52 / 6), players: defaultPlayers }
      : { nroPlayers: 6, maxCards: Math.floor(52 / 6) };

  const onSubmit = (values: Values) => {
    if (values.players === undefined) return { players: 'required' };
    const { nroPlayers, players, isLimitedCards, maxCards } = values;

    const nroPlayersNum = parseInt(nroPlayers, 10);
    const maxCardsNum = parseInt(maxCards, 10);

    if (nroPlayersNum !== players?.split(',').length) {
      const diff = nroPlayersNum - players?.split(',').length;
      const errorMerssage =
        diff > 0 ? `Te faltan ${diff} jugadores` : `Te sobran ${Math.abs(diff)} jugadores`;
      return {
        error: errorMerssage,
      };
    }
    localStorage.setItem('nroPlayers', nroPlayers);
    localStorage.setItem('players', players);

    const error = isLimitedCards
      ? localStorage.setItem('maxCards', maxCards)
      : localStorage.setItem('maxCards', Math.floor(52 / nroPlayersNum).toString());

    const totalHands = isLimitedCards
      ? nroPlayersNum + maxCardsNum * 2 + 1
      : nroPlayersNum + Math.floor(52 / nroPlayersNum) * 2 + 1;

    const game: number[] = [];
    Array.from(Array(totalHands).keys()).forEach((value) => {
      const cards: number = isLimitedCards ? maxCardsNum : Math.floor(52 / nroPlayersNum);
      if (value + 1 > cards && value + 1 <= cards + nroPlayersNum) game.push(cards);
      else if (value + 1 > cards + nroPlayersNum && totalHands - value - 1 !== 0)
        game.push(totalHands - value - 1);
      else if (totalHands - value - 1 === 0) game.push(1);
      else game.push(value + 1);
    });

    localStorage.setItem('game', game.toString());

    router.push('/game');
    return error;
  };
  return { initValues, onSubmit };
};

export default useForm;
