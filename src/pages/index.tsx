import { FunctionComponent } from 'react';
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
  ButtonGroup,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { Form, Field } from 'react-final-form';
import useForm from 'hooks/useForm';

const ErrorMessage: FunctionComponent<IFormErrorMessage> = ({ fieldName }) => {
  return (
    <Field name={fieldName} subscription={{ touched: true, error: true, submitError: true }}>
      {({ meta }) => {
        const hasError = meta.touched && (meta.error || meta.submitError);
        if (!hasError) return null;
        return (
          <Text as="span" fontSize="0.75rem" color="gray.500">
            {meta.error || meta.submitError}
          </Text>
        );
      }}
    </Field>
  );
};

// export default ErrorMessage;

const IndexPage: NextPage = () => {
  const { initValues, onSubmit } = useForm();
  return (
    <Flex justify="center" w="100%" p="2rem 0 0 0 ">
      <Form
        onSubmit={onSubmit}
        initialValues={initValues}
        // validate={validations}
        render={({ handleSubmit, values }) => (
          <Flex as="form" autoComplete="off" onSubmit={handleSubmit} direction="column" w="50%">
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
            <Flex marginTop="1rem">
              <Field name="isLimitedCards" type="checkbox">
                {({ input }) => (
                  <FormControl>
                    <FormLabel>Limitar cartas</FormLabel>
                    <Checkbox {...input} size="lg" />
                  </FormControl>
                )}
              </Field>
              <Field name="maxCards">
                {({ input }) => (
                  <FormControl>
                    <FormLabel>Maximo de cartas</FormLabel>
                    <NumberInput
                      {...input}
                      min={5}
                      max={Math.floor(52 / parseInt(values.nroPlayers, 10))}
                      isDisabled={!values.isLimitedCards}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                )}
              </Field>
            </Flex>
            <Field name="players">
              {({ input }) => (
                <FormControl marginTop="1rem">
                  <FormLabel>Jugadores</FormLabel>
                  <Input {...input} placeholder="Jugadores" type="text" />
                  <ErrorMessage fieldName="players" />
                </FormControl>
              )}
            </Field>
            <ErrorMessage fieldName="error" />
            <ButtonGroup marginTop="1rem">
              <Button type="submit" colorScheme="teal">
                Jugar
              </Button>
            </ButtonGroup>
          </Flex>
        )}
      />
    </Flex>
  );
};

export default IndexPage;
