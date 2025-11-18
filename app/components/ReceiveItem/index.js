import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Info, Tag, Value, Description } from './styles';

export default function ReceiveItem({ data, onDelete }){
  const isIncome = data.type === 'receita' || data.type === 'receive' || data.type === 'income';

  return (
    <Container>
      <Info>
        <Tag bg={isIncome ? '#00b94a' : '#ef463a'}>
          { isIncome ? 'receita' : 'despesa' }
        </Tag>

        <Description numberOfLines={1}>{data.description}</Description>
      </Info>

      <Value>{Number(data.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Value>

      { onDelete && (
        <TouchableOpacity
          onPress={() => {
            console.log('[ReceiveItem] delete pressed', data);
            onDelete(data);
          }}
          style={{ marginLeft: 8, padding: 6 }}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          activeOpacity={0.7}
        >
          <Icon name="trash" size={18} color="#ef463a" />
        </TouchableOpacity>
      )}
    </Container>
  )
}
