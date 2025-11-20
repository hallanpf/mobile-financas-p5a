import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, ButtonMenu } from './styles';

export default function Header({ title }){
    const navigation = useNavigation();

    function handleToggle(){
      if(navigation.toggleDrawer) navigation.toggleDrawer();
    }

    return(
        <Container>
            <ButtonMenu onPress={handleToggle}>
              <Icon name="menu" size={24} color="#171717" />
            </ButtonMenu>

            { title && (
                <Title>
                    {title}
                </Title>
            )}
        </Container>
    )
}