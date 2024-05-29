import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Input, Textarea, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const EditCampaign = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('campaign').select('*').eq('campaign_id', id).single();
    if (error) {
      console.error('Error fetching campaign:', error);
      setError(error);
    } else {
      setTitle(data.campaign_name);
      setAmount(data.campaign_amount);
      setCurrency(data.campaign_currency);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('campaign').update({ campaign_name: title, campaign_amount: amount, campaign_currency: currency }).eq('campaign_id', id);
    if (error) {
      console.error('Error updating campaign:', error);
      setError(error);
    } else {
      navigate('/admin');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Spinner size="xl" />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          mb={3}
        />
        <Button type="submit">Update Campaign</Button>
      </Box>
    </AdminLayout>
  );
};

export default EditCampaign;
