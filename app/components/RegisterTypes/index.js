import React from 'react';
import { RegisterContainer, RegisterTypeButton, RegisterLabel } from './styles';

export default function RegisterTypes({ selected, setSelected }){
  return (
    <RegisterContainer>
      <RegisterTypeButton checked={selected === 'receita'} onPress={() => setSelected('receita')}>
        <RegisterLabel>Receita</RegisterLabel>
      </RegisterTypeButton>

      <RegisterTypeButton checked={selected === 'despesa'} onPress={() => setSelected('despesa')}>
        <RegisterLabel>Despesa</RegisterLabel>
      </RegisterTypeButton>
    </RegisterContainer>
  )
}
