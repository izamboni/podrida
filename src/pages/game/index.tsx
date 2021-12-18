import { FC } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import GameTable from 'components/game-table';
import useScoreBoard from 'hooks/useScoreboard';

const Game: FC = () => {
  const {
    players,
    maxCards,
    handleExpected,
    handleActual,
    calculateTotal,
    calcualteExpected,
    totalHands,
    game,
    totals,
    expectedTotals,
  } = useScoreBoard();

  const bg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Flex direction="column" align="center" justify="center" w="100%" p="0 5rem 0 5rem" bg={bg}>
      <GameTable
        players={players}
        maxCards={maxCards}
        totalHands={totalHands}
        game={game}
        handleExpected={handleExpected}
        handleActual={handleActual}
        calcualteExpected={calcualteExpected}
        calculateTotal={calculateTotal}
        totals={totals}
        expectedTotals={expectedTotals}
      />
    </Flex>
  );
};

export default Game;
