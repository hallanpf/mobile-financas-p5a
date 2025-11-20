import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage(){
      try{
        const token = await AsyncStorage.getItem('@finToken');
        if(token){
          api.defaults.headers['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/me');
          setUser(response.data);
        }
      }catch(err){
        setUser(null);
      }finally{
        setLoading(false);
      }
    }

    loadStorage();
  },[])

  if(loading) return null;

  async function signOut(){
    try{
      await AsyncStorage.removeItem('@finToken');
    }catch(e){
    }
    setUser(null);
  }

  async function signUp(email, password, nome){
    setLoadingAuth(true);
    try{
      await api.post('/users', {
       name: nome,
       password: password,
       email: email,
      })

      setLoadingAuth(false);
      return true;

    }catch(err){
      setLoadingAuth(false);
      return false;
    }
  }

  async function signIn(email, password){
    setLoadingAuth(true);

    try{
      const response = await api.post('/login', {
        email: email,
        password: password
      })

      const { id, name, token } = response.data;

      await AsyncStorage.setItem('@finToken', token);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      })

      setLoadingAuth(false);
      return true;

    }catch(err){
      setLoadingAuth(false);
      return false;
    }

  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;