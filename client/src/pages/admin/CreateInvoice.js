import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  useToast,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const CreateInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [dueDate, setDueDate] = useState('');
  const [partner, setPartner] = useState('');
  const [partners, setPartners] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase.from('partner').select('*');
    if (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: 'Error',
        description: 'There was an error fetching the partners.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setPartners(data);
    }
  }, [toast]);

  useEffect(() => {
    fetchPartners();
    window.scrollTo(0, 0);
  }, [fetchPartners]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('invoice').insert([
      {
        invoice_number: invoiceNumber,
        invoice_amount: invoiceAmount,
        currency,
        due_date: dueDate,
        partner_id: partner,
      },
    ]);
    if (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating the invoice.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/admin');
      toast({
        title: 'Success',
        description: 'Invoice created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <AdminLayout>
      <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW="5xl"
          p={6}
          boxShadow="md"
          borderRadius="md"
          bg="white"
          w="full"
        >
          <VStack spacing={4} align="flex-start">
            <FormControl id="invoice-number" isRequired>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                placeholder="Invoice Number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <FormHelperText>Enter the invoice number.</FormHelperText>
            </FormControl>

            <FormControl id="invoice-amount" isRequired>
              <FormLabel>Invoice Amount</FormLabel>
              <NumberInput
                value={invoiceAmount}
                onChange={(valueString) => setInvoiceAmount(valueString)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>Enter the amount of the invoice.</FormHelperText>
            </FormControl>

            <FormControl id="currency" isRequired>
              <FormLabel>Currency</FormLabel>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
              <FormHelperText>Select the currency of the invoice.</FormHelperText>
            </FormControl>

            <FormControl id="due-date" isRequired>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <FormHelperText>Select the due date for the invoice.</FormHelperText>
            </FormControl>

            <FormControl id="partner" isRequired>
              <FormLabel>Partner</FormLabel>
              <Select
                placeholder="Select Partner"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
              >
                {partners.map((partner) => (
                  <option key={partner.partner_id} value={partner.partner_id}>
                    {partner.company_name}
                  </option>
                ))}
              </Select>
              <FormHelperText>Select the partner associated with the invoice.</FormHelperText>
            </FormControl>

            <HStack spacing={4}>
              <Button type="submit" colorScheme="blue" size="lg">
                Create Invoice
              </Button>
              <Button onClick={handleCancel} colorScheme="gray" size="lg">
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </AdminLayout>
  );
};

export default CreateInvoice;
