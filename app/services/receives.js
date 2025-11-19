import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getReceives(date){
  // date expected in format 'DD/MM/YYYY' or 'YYYY-MM-DD' depending on backend
  try{
    const response = await api.get('/receives', { params: { date } });
    return response.data;
  }catch(err){
    throw err;
  }
}

export async function createReceive(payload){
  try{
    const response = await api.post('/receive', payload);
    return response.data;
  }catch(err){
    throw err;
  }
}

export async function deleteReceive(item_id){
  try{
    if(!item_id) throw new Error('item_id is required');

    // Build the URL with a query string to ensure the DELETE request carries the identifier
    const params = { item_id };

    // Ensure Authorization header is present. The Auth provider normally sets
    // `api.defaults.headers['Authorization']`, but in some cases it may be missing
    // (app hot-reload, race conditions). Fall back to AsyncStorage token.
    let headers = {};
    const globalAuth = api.defaults.headers && (api.defaults.headers['Authorization'] || api.defaults.headers['authorization']);
    if(globalAuth){
      headers.Authorization = globalAuth;
    }else{
      const token = await AsyncStorage.getItem('@finToken');
      if(token){
        headers.Authorization = `Bearer ${token}`;
      }
    }


    // Use axios params option (more reliable than building the query string manually)
    const response = await api.delete('/receives/delete', { params, headers });

    // Request sent, return response data
    return response.data;
  }catch(err){
    throw err;
  }
}

export async function getBalance(date){
  try{
    const response = await api.get('/balance', { params: { date } });
    return response.data;
  }catch(err){
    throw err;
  }
}
