// CreateCampaign.js
import React, { useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('campaigns').insert([{ title, description }]);
    if (error) console.error('Error creating campaign:', error);
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
        <Button type="submit">Create Campaign</Button>
      </Box>
    </AdminLayout>
  );
};

export default CreateCampaign;