import { FC } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Input, Stack } from '@chakra-ui/react';

const GameTable: FC<IGameTable> = ({
  players,
  maxCards,
  totalHands,
  handleExpected,
  handleActual,
  calcualteExpected,
  calculateTotal,
}) => {
  return (
    <Table colorScheme="blue" bg="gray.700">
      <Thead position="sticky" top="0" bg="black" zIndex="5">
        <Tr>
          <Th />
          {players.map((player) => (
            <Th key={player}>{player}</Th>
          ))}
          <Th>Pedidas</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.from(Array(totalHands).keys()).map((value, i) => (
          <Tr key={value}>
            {value < maxCards && <Td>{Array.from(Array(maxCards).keys())[i] + 1}</Td>}
            {value >= maxCards && value < maxCards + players.length && (
              <Td bg="teal.500"> {maxCards}</Td>
            )}
            {value >= maxCards + players.length && (
              <Td>
                {Array.from(Array(maxCards).keys()).slice(0).reverse()[
                  i - maxCards - players.length
                ] + 1}
              </Td>
            )}
            {players.map((player) => (
              <Td key={player}>
                <Stack spacing="4">
                  <Input
                    type="number"
                    placeholder="Pedidas"
                    onChange={(e) => handleExpected(player, i, parseInt(e.target.value, 10))}
                    w="75%"
                  />
                  <Input
                    type="number"
                    placeholder="Hechas"
                    w="75%"
                    onChange={(e) => handleActual(player, i, parseInt(e.target.value, 10))}
                  />
                </Stack>
              </Td>
            ))}
            <Td>{calcualteExpected(value + 1, i)}</Td>
          </Tr>
        ))}
        <Tr>
          <Td>Indio</Td>
          {players.map((player) => (
            <Td key={player}>
              <Stack spacing="4">
                <Input type="number" placeholder="Pedidas" w="75%" />
                <Input type="number" placeholder="Hechas" w="75%" />
              </Stack>
            </Td>
          ))}
        </Tr>
      </Tbody>
      <Tfoot position="sticky" bottom="0" bg="black" zIndex="5">
        <Tr>
          <Td>Total</Td>
          {players.map((player) => (
            <Td key={player}>{calculateTotal(player)}</Td>
          ))}
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default GameTable;
