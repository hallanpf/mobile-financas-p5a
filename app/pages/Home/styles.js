import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #F0F4FF;
`;

export const HeaderArea = styled.View`
  padding: 14px;
`;

export const BalanceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const BalanceCard = styled.View`
  background-color: ${props => props.bg || '#3b3dbf'};
  padding: 12px;
  margin-right: 8px;
  border-radius: 8px;
`;

export const CardLabel = styled.Text`
  color: #FFF;
  font-size: 12px;
`;

export const CardValue = styled.Text`
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  margin-top: 6px;
`;

export const SectionTitle = styled.Text`
  padding: 10px 14px;
  font-size: 16px;
  font-weight: bold;
  color: #171717;
`;
