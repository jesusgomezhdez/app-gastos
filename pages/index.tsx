
import { createRef } from 'react'
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
  Tfoot,
  TableCaption
} from '@chakra-ui/react'
import { useState } from 'react'
//@ts-ignore
import { useScreenshot, createFileName } from 'use-react-screenshot'

interface Expense {
  name: string;
  amount: number;
}

const Home: NextPage = () => {
  const ref = createRef<HTMLDivElement>()
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });


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

  const download = (image: any, { extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, inputDate);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);


  return (
    <Container maxW='container.lg' >
      <Box textAlign='center' margin={10} >
        <Heading>Control de Gastos</Heading>
      </Box>
      <Container maxW='container.md' bg='gray.50' padding={5} mb={10}>
        <Stack direction={['column', 'row']}>
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
        <Stack direction={['column', 'row']} mt={10}>
          <Box flex={2}>
            <Input
              placeholder='Descripción del gasto'
              size='md'
              value={inputDescription}
              onChange={(e) => {
                setInputDescription(e.target.value)
              }}
              type='text'
            />
          </Box>
          <Box flex={2}>
            <Input
              placeholder='Monto total'
              size='md'
              value={inputAmount}
              onChange={(e) => {
                console.log(e, 'event')
                setInputAmount(+e.target.value)
              }}
              type='number'
            />
          </Box>
          <Box flex={1} justifyContent='center' display='flex' >
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
        {expensesList.length !== 0 ? (
          <>
            <Box ref={ref} sx={{ padding: 0 }}>
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
                  <TableCaption>{`${inputDate}  ${formatedNumber(inputTotalAmount)} - ${formatedNumber(newTotalAmount)}`}</TableCaption>
                </Table>
              </TableContainer>
            </Box>
            <Box flex={1} justifyContent='center' display='flex' mt={10}>
              <Button
                colorScheme='twitter'
                size='md'
                onClick={downloadScreenshot}
              >
                Descargar
              </Button>
            </Box>
          </>
        ) : null}

      </Container>
    </Container>
  )
}

export default Home
