import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './app/routes';
import AuthProvider from './app/context/auth';
import { ReceivesProvider } from './app/context/receives';
import Toast from 'react-native-toast-message';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <ReceivesProvider>
          <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
          <Routes/>
          <Toast />
        </ReceivesProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}