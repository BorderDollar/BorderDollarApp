// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase.from('campaigns').select('*');
    if (error) console.error('Error fetching campaigns:', error);
    else setCampaigns(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) console.error('Error deleting campaign:', error);
    else fetchCampaigns();
  };

  return (
    <AdminLayout>
      <Button onClick={() => navigate('/admin/create')}>Create Campaign</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map((campaign) => (
            <Tr key={campaign.id}>
              <Td>{campaign.title}</Td>
              <Td>{campaign.description}</Td>
              <Td>
                <Button onClick={() => navigate(`/admin/edit/${campaign.id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(campaign.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminLayout>
  );
};

export default AdminDashboard;