import React, { createContext, useEffect, useState, useContext } from 'react';
import { getReceives, createReceive as apiCreate, deleteReceive as apiDelete } from '../services/receives';
import Toast from 'react-native-toast-message';
import { AuthContext } from './auth';

export const ReceivesContext = createContext({});

export function ReceivesProvider({ children }){
  const [receives, setReceives] = useState([]);
  const [balance, setBalance] = useState({ total: 'R$ 0,00', income: 'R$ 0,00', outcome: 'R$ 0,00' });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  async function loadReceives(){
    setLoading(true);
    try{
      const r = await getReceives();
      setReceives(r || []);

      const incomeSum = (r || []).reduce((acc, item) => {
        const v = Number(item.value ?? item.valor ?? 0) || 0;
        const type = (item.type || item.tipo || '').toString().toLowerCase();
        return acc + (type === 'receita' || type === 'receive' || type === 'income' ? v : 0);
      }, 0);

      const outcomeSum = (r || []).reduce((acc, item) => {
        const v = Number(item.value ?? item.valor ?? 0) || 0;
        const type = (item.type || item.tipo || '').toString().toLowerCase();
        return acc + (type === 'despesa' || type === 'expense' || type === 'outcome' ? v : 0);
      }, 0);

      const total = incomeSum - outcomeSum;
      const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      setBalance({ total: fmt(total), income: fmt(incomeSum), outcome: fmt(outcomeSum) });

    }catch(err){
    }finally{
      setLoading(false);
    }
  }

  async function addReceive(payload){
    try{
      await apiCreate(payload);
      await loadReceives();
      return true;
    }catch(err){
      return false;
    }
  }

  async function removeReceive(idOrItem){
    try{
      const isObject = idOrItem && typeof idOrItem === 'object';
      const item = isObject ? idOrItem : null;
      const id = isObject ? (item._id || item.id || item.item_id || item.itemId || item.uuid) : idOrItem;
      if(!id){
        throw new Error('ID do registro não foi informado');
      }

      Toast.show({ type: 'info', text1: 'Enviando requisição de exclusão...' });
      await apiDelete(id);
      Toast.show({ type: 'success', text1: 'Exclusão solicitada' });
      await loadReceives();
      return true;
    }catch(err){
      const msg = err && err.response && (err.response.data && (err.response.data.message || err.response.data.error)) ?
        (err.response.data.message || err.response.data.error) : (err.message || 'Erro ao excluir registro');
      Toast.show({ type: 'error', text1: msg });
      return false;
    }
  }

  useEffect(() => {
    if(user && user.id){
      loadReceives();
    }else{
      setReceives([]);
    }
  },[user])

  return (
    <ReceivesContext.Provider value={{ receives, balance, loading, loadReceives, addReceive, removeReceive }}>
      {children}
    </ReceivesContext.Provider>
  )
}

export default ReceivesProvider;
