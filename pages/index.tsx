import type { NextPage } from 'next'
import {
  Container,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { useState } from 'react'

interface Expense {
  name: string;
  amount: number;
}

const Home: NextPage = () => {
  const [inputDate, setInputDate] = useState<string>('')
  const [inputTotalAmount, setInputTotalAmount] = useState<number>(0)
  const [newTotalAmount, setNewTotalAmount] = useState<number>(0)

  const [inputDescription, setInputDescription] = useState<string>('')
  const [inputAmount, setInputAmount] = useState<number>(0)

  const [expensesList, setExpenseList] = useState<Array<Expense>>([])

  const save = () => {
    const newTotal = newTotalAmount - inputAmount
    setNewTotalAmount(newTotal)
    setExpenseList([...expensesList, {
      name: inputDescription,
      amount: inputAmount
    }])
    setInputDescription('')
    setInputAmount(0)
  }

  const formatedNumber = (amount: number) => {
    const options = { style: 'currency', currency: 'USD' }
    const numberFormat = new Intl.NumberFormat('en-US', options)
    return numberFormat.format(amount)
  }

  return (
    <Container maxW='container.lg' >
      <Box textAlign='center' margin={10} >
        <Heading>Control de Gastos</Heading>
      </Box>
      <Container maxW='container.md' bg='gray.50' padding={5}>
        <Stack direction='row'>
          <Box flex={1}>
            <Text fontSize='sm'>Fecha</Text>
            <Input
              placeholder='Fecha'
              size='md'
              value={inputDate}
              onChange={(e) => {
                setInputDate(e.target.value)
              }}
              type="date"
            />
          </Box>
          <Box flex={1}>
            <Text 
              fontSize='sm'
            >Monto Total</Text>
            <Input
              placeholder='Monto total'
              size='md'
              value={inputTotalAmount}
              onChange={(e) => {
                setInputTotalAmount(+e.target.value)
                setNewTotalAmount(+e.target.value)
              }}
              type='number'
            />
          </Box>
        </Stack>
        <Stack mt={10} textAlign='center'>
          <Text fontSize='xl'>
            {inputDate ? inputDate : 'Agregue una fecha'}
          </Text>
          {inputTotalAmount ? (
            <Text fontSize='3xl'>
              {`Total: ${formatedNumber(inputTotalAmount)} - Restante: ${formatedNumber(newTotalAmount)}`}
            </Text>
          ) : (
            <Text fontSize='3xl'>
              Agregue un monto total
            </Text>
          )}
        </Stack>
        <Stack direction='row' mt={10}>
          <Input
            placeholder='Descripción del gasto'
            size='md'
            value={inputDescription}
            onChange={(e) => {
              setInputDescription(e.target.value)
            }}
            type='text'
          />
          <Input
            placeholder='Monto total'
            size='md'
            value={inputAmount}
            onChange={(e) => {
              setInputAmount(+e.target.value)
            }}
            type='number'
          />
          <Box>
            <Button
              colorScheme='twitter'
              size='md'
              onClick={save}
              isDisabled={!inputDescription || inputAmount === 0}
            >
              Agregar
            </Button>
          </Box>
        </Stack>
        <TableContainer mt={10}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Gasto</Th>
                <Th isNumeric>Monto</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expensesList.map((expense, index) => (
                <Tr key={index}>
                  <Td>{expense.name}</Td>
                  <Td isNumeric>{formatedNumber(expense.amount)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  )
}

export default Home
