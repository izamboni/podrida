import { useRouter } from 'next/router';
import { NextPage } from 'next';
import {
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
} from '@chakra-ui/react';
import { Form, Field } from 'react-final-form';

interface Values {
  nroPlayers: number;
  players: string;
}

const IndexPage: NextPage = () => {
  const router = useRouter();
  const onSubmit = (values: Values) => {
    localStorage.setItem('nroPlayers', values.nroPlayers.toString());
    localStorage.setItem('players', values.players);
    router.push('/game');
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ nroPlayers: 6 }}
      // validate={validations}
      render={({ handleSubmit }) => (
        <Flex as="form" autoComplete="off" onSubmit={handleSubmit} direction="column">
          <Field name="nroPlayers">
            {({ input }) => (
              <FormControl>
                <FormLabel>Numero de jugadores</FormLabel>
                <NumberInput {...input} defaultValue={6} min={6} max={9}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
          </Field>
          <Field name="players">
            {({ input }) => (
              <FormControl>
                <FormLabel>Jugadores</FormLabel>
                <Input {...input} placeholder="Jugadores" type="text" />
              </FormControl>
            )}
          </Field>
          <Button type="submit" colorScheme="teal">
            Jugar
          </Button>
        </Flex>
      )}
    />
  );
};

export default IndexPage;
