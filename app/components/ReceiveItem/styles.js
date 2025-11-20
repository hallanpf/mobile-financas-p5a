import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #F7F9FF;
  padding: 12px 14px;
  margin: 6px 14px;
  border-radius: 6px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Tag = styled.Text`
  background-color: ${props => props.bg || '#ef463a'};
  color: #FFF;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  text-transform: lowercase;
  font-size: 12px;
`;

export const Description = styled.Text`
  margin-left: 10px;
  color: #171717;
  flex-shrink: 1;
  font-size: 14px;
`;

export const Value = styled.Text`
  font-weight: bold;
  margin-left: 12px;
`;
