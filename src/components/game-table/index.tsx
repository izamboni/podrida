import { FC } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Input,
  Stack,
  useColorMode,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const GameTable: FC<IGameTable> = ({
  players,
  maxCards,
  handleExpected,
  handleActual,
  calcualteExpected,
  calculateTotal,
  game,
  totals,
  expectedTotals,
  totalHands,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === 'dark';
  const bg = useColorModeValue('gray.200', 'gray.900');
  const banner = useColorModeValue('white', 'black');
  const colorScheme = useColorModeValue('black', 'blue');

  return (
    <Table colorScheme={colorScheme} bg={bg}>
      <Thead position="sticky" top="0" bg={banner} zIndex="5">
        <Tr>
          <Th />
          {players.map((player) => (
            <Th key={player} textAlign="center">
              {player}
            </Th>
          ))}
          <Th textAlign="center">Pedidas</Th>
        </Tr>
      </Thead>
      <Tbody>
        {game.map((value, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tr key={i}>
            {value <= maxCards && (
              <Td
                bg={i >= maxCards && i < maxCards + players.length ? 'teal.500' : ''}
                textAlign="center"
              >
                {i + 2 === totalHands ? 'Indio' : value}
              </Td>
            )}
            {players.map((player) => (
              <Td key={player} textAlign="center">
                <Stack spacing="4" alignItems="center">
                  <Input
                    textAlign="center"
                    type="number"
                    placeholder="Pedidas"
                    onChange={(e) => handleExpected(player, i, parseInt(e.target.value, 10))}
                    onBlur={() => calcualteExpected(value, i)}
                    w="75%"
                  />
                  <Input
                    textAlign="center"
                    type="number"
                    placeholder="Hechas"
                    w="75%"
                    onChange={(e) => handleActual(player, i, parseInt(e.target.value, 10))}
                    onBlur={() => calculateTotal(player)}
                  />
                </Stack>
              </Td>
            ))}
            <Td textAlign="center">{expectedTotals.filter((e) => e.id === i)[0].value}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot position="sticky" bottom="0" bg={banner} zIndex="5">
        <Tr>
          <Td>Total</Td>
          {players.map((player) => (
            <Td key={player} textAlign="center">
              {totals.filter((t) => t.player === player)[0].total}
            </Td>
          ))}
          <Td>
            <Button onClick={toggleColorMode}>{isDark ? <SunIcon /> : <MoonIcon />}</Button>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default GameTable;
