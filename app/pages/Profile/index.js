import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../../context/auth';
import { Container, Button, ButtonText, Title } from './styles';

export default function Profile({ navigation }){
  const { user, signOut } = useContext(AuthContext);

  function handleRegister(){
    navigation.navigate('Registrar');
  }

  function handleLogout(){
    signOut();
  }

  return(
    <Container>
      <Title>Meu perfil</Title>
      <Text style={{ marginTop: 12 }}>{user && user.name}</Text>

      <Button onPress={handleRegister}>
        <ButtonText>Registrar gastos</ButtonText>
      </Button>

      <Button variant="danger" onPress={handleLogout}>
        <ButtonText variant="danger">Sair</ButtonText>
      </Button>
    </Container>
  )
}
