import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import RegisterTypes from '../../components/RegisterTypes';
import { AuthContext } from '../../context/auth';
import { ReceivesContext } from '../../context/receives';
import Toast from 'react-native-toast-message';

export default function New({ navigation }){
  const { user } = useContext(AuthContext);
  const { addReceive } = useContext(ReceivesContext);

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister(){
    if(description === '' || value === '') {
      Toast.show({ type: 'error', text1: 'Preencha todos os campos' });
      return;
    }

    try{
      setSubmitting(true);
      const payload = {
        description,
        value: Number(value),
        type,
        date: new Date(),
      }

      const ok = await addReceive(payload);
      if(ok){
        Toast.show({ type: 'success', text1: 'Registro criado com sucesso' });
        setDescription('');
        setValue('');
        setType('receita');
      }else{
        Toast.show({ type: 'error', text1: 'Não foi possível cadastrar' });
      }
    }catch(err){
      Alert.alert('Erro','Não foi possível cadastrar');
    }
    finally{
      setSubmitting(false);
    }
  }

  return(
    <Background>
      <Input
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <RegisterTypes selected={type} setSelected={setType} />

      <SubmitButton onPress={handleRegister} disabled={submitting}>
        { submitting ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <SubmitText>Registrar</SubmitText>
        ) }
      </SubmitButton>
    </Background>
  )
}
