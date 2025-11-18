import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 30px;
  background-color: #F0F4FF;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  background-color: ${props => props.variant === 'danger' ? '#FFF' : '#3b3dbf'};
  border: ${props => props.variant === 'danger' ? '1px solid #ef463a' : '0px'};
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.variant === 'danger' ? '#ef463a' : '#fff'};
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;
