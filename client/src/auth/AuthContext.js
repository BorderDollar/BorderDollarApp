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
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error fetching user data:', error);
      setUser(authUser); // Set user without metadata
    } else {
      const userWithMetadata = {
        ...authUser,
        app_role: data.user.app_metadata.app_role,
      };
      console.log(data.user.app_metadata.app_role)
      setUser(userWithMetadata);
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
