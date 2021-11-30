import { FC, useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Input, Stack, Flex } from '@chakra-ui/react';

interface Expected {
  id: number;
  player: string;
  value: number;
}
interface Actual {
  id: number;
  player: string;
  value: number;
}

// interface Total {
//   player: string;
//   value: number;
// }

const Game: FC = () => {
  const [expected, setExpected] = useState<Expected[]>([]);
  const [actual, setActual] = useState<Actual[]>([]);

  const players = localStorage.getItem('players')?.split(',') || [];
  // const defaultTotals: Total[] = players.map((player) => ({ player, value: 0 }));
  // const [total, setTotal] = useState<Total[]>(defaultTotals);

  const maxCards = Math.floor(52 / players.length);
  const totalHands = 2 * maxCards + players.length;

  // const calculateTotal = (aux: Expected | Actual, called: string) => {
  //   if (called === 'expected') {
  //     const currentActual = actual.filter((e) => e.id === aux.id && e.player === aux.player)[0];
  //     if (currentActual) {

  //     }
  //   }
  //   console.log(total.filter((t) => t.player === aux.player)[0]);
  // };

  const handleExpected = (player: string, id: number, value: number) => {
    if (Number.isNaN(value)) {
      const expectedToRemove = expected.filter((e) => e.id === id && e.player === player)[0];
      if (expectedToRemove) {
        setExpected(expected.filter((e) => e.id === id && e.player !== player));
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
    // calculateTotal(newExpected, 'expected');
  };

  const handleActual = (player: string, id: number, value: number) => {
    const newActual = actual.filter((e) => e.id === id && e.player === player)[0];
    if (!newActual) {
      setActual([...actual, { id, player, value }]);
    }
    if (newActual) {
      setActual(actual.map((e) => (e.id === id && e.player === player ? { ...e, value } : e)));
    }
    // calculateTotal(newActual, 'actual');
  };

  const calcualteExpected = (cards: number, hand: number) => {
    const expects = expected.filter((e) => e.id === hand);
    if (expects.length === 0) return '-';
    const expectedValue = expects.reduce((acc, curr) => acc + curr.value, 0);
    const toReturn =
      expectedValue - cards > 0 ? `+${expectedValue - cards}` : expectedValue - cards;
    return toReturn;
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
    return total;
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      p="0 5rem 0 5rem"
      bg="gray.300"
    >
      <Table colorScheme="blue" bg="gray.100">
        <Thead position="sticky" top="0" bg="white" zIndex="5">
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
        <Tfoot position="sticky" bottom="0" bg="white" zIndex="5">
          <Tr>
            <Td>Total</Td>
            {players.map((player) => (
              <Td key={player}>{calculateTotal(player)}</Td>
            ))}
            {/* {players.map((player) => (
              <Td key={player}>{total.filter((e) => e.player === player)[0].value}</Td>
            ))} */}
          </Tr>
        </Tfoot>
      </Table>
    </Flex>
  );
};

export default Game;

// {Array.from(Array(maxCards).keys()).map((hand) => (
//   <Tr key={hand}>
//     <Td>{hand + 1}</Td>
//     {players.map((player) => (
//       <Td key={player}>
//         <Stack spacing="4">
//           <Input type="number" placeholder="Pedidas" w="75%" />
//           <Input type="number" placeholder="Hechas" w="75%" />
//         </Stack>
//       </Td>
//     ))}
//   </Tr>
// ))}
// {players.map((player) => (
//   <Tr key={player} bg="teal.750">
//     <Td>{maxCards}</Td>
//     {players.map((playerr) => (
//       <Td key={playerr}>
//         <Stack>
//           <Input type="number" placeholder="Pedidas" w="75%" />
//           <Input type="number" placeholder="Hechas" w="75%" />
//         </Stack>
//       </Td>
//     ))}
//   </Tr>
// ))}
// {Array.from(Array(maxCards).keys())
//   .slice(0)
//   .reverse()
//   .map((hand) => (
//     <Tr key={hand}>
//       <Td>{hand + 1}</Td>
//       {players.map((player) => (
//         <Td key={player}>
//           <Stack>
//             <Input type="number" placeholder="Pedidas" w="75%" />
//             <Input type="number" placeholder="Hechas" w="75%" />
//           </Stack>
//         </Td>
//       ))}
//     </Tr>
//   ))}
// <Tr>
//   <Td>Indio</Td>
//   {players.map((player) => (
//     <Td key={player}>
//       <Stack>
//         <Input type="number" placeholder="Pedidas" w="75%" />
//         <Input type="number" placeholder="Hechas" w="75%" />
//       </Stack>
//     </Td>
//   ))}
// </Tr>
