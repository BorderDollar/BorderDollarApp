import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchUserData(session.user);
      } else {
        setLoading(false);
      }
    };

    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserData(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (authUser) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authUser.id)
      .single();
    
    if (error) {
      console.error('Error fetching user role:', error);
      setUser(authUser); // Set user without role
    } else {
      setUser({ ...authUser, role: data.role });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
