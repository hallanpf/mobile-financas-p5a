import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getReceives(date){
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

    const params = { item_id };
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
    const response = await api.delete('/receives/delete', { params, headers });
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
