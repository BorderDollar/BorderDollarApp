// EditCampaign.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const EditCampaign = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const fetchCampaign = async () => {
    const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single();
    if (error) console.error('Error fetching campaign:', error);
    else {
      setTitle(data.title);
      setDescription(data.description);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('campaigns').update({ title, description }).eq('id', id);
    if (error) console.error('Error updating campaign:', error);
    else navigate('/admin');
  };

  return (
    <AdminLayout>
      <Box as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={3}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={3}
        />
        <Button type="submit">Update Campaign</Button>
      </Box>
    </AdminLayout>
  );
};

export default EditCampaign;