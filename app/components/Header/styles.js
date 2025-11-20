import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 18px;
  padding-left: 14px;
  padding-bottom: 12px;
  width: 100%;
  max-height: 60px;
`;

export const Title = styled.Text`
  font-size: 22px;
  margin-left: 12px;
  font-weight: bold;
  color: #171717;
`;

export const ButtonMenu = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

