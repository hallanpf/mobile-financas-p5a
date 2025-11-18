import api from './api';

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

export async function deleteReceive(item_id, user_id){
  try{
    // Use DELETE with query params to ensure compatibility with browsers/proxies
    const response = await api.delete('/receives/delete', { params: { item_id, user_id } });
    return response.data;
  }catch(err){
    // Propagate the original error; backend should accept query params
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
