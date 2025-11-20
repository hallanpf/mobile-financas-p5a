import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, ScrollView, Dimensions, Platform } from 'react-native';
import ReceiveItem from '../../components/ReceiveItem';
import { AuthContext } from '../../context/auth';
import { useFocusEffect } from '@react-navigation/native';
import { ReceivesContext } from '../../context/receives';
import Toast from 'react-native-toast-message';
import { Container, HeaderArea, BalanceRow, BalanceCard, CardLabel, CardValue, SectionTitle } from './styles';

export default function Home(){
  const { loading } = useContext(AuthContext);
  const { receives, balance, loading: loadingReceives, loadReceives, removeReceive } = useContext(ReceivesContext);
  const [loadingData, setLoadingData] = useState(false);

    

  useFocusEffect(
    useCallback(() => {
      loadReceives();
    }, [])
  )

  

  async function handleDelete(item){
    const id = item && (item._id || item.id || item.item_id || item.itemId || item.uuid);
    if(!id){
      Toast.show({ type: 'error', text1: 'ID do registro não encontrado' });
      return;
    }
    if(Platform.OS === 'web'){
      try{
        const ok = await removeReceive(item);
        if(ok){
          Toast.show({ type: 'success', text1: 'Registro excluído' });
        }else{
          Toast.show({ type: 'error', text1: 'Não foi possível excluir o registro' });
        }
      }catch(err){
        const msg = err && err.response && (err.response.data && (err.response.data.message || err.response.data.error)) ?
          (err.response.data.message || err.response.data.error) : (err.message || 'Erro ao excluir registro');
        Toast.show({ type: 'error', text1: msg });
      }
      return;
    }

    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja deletar esse registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: async () => {
            try{
              const ok = await removeReceive(item);
              if(ok){
                Toast.show({ type: 'success', text1: 'Registro excluído' });
              }else{
                Toast.show({ type: 'error', text1: 'Não foi possível excluir o registro' });
              }
            }catch(err){
              const msg = err.response && err.response.data && (err.response.data.message || err.response.data.error) ?
                (err.response.data.message || err.response.data.error) : 'Erro ao excluir registro';
              Toast.show({ type: 'error', text1: msg });
            }
          }
        }
      ],
      { cancelable: true }
    );
  }

  if(loadingData || loading) return <ActivityIndicator size={30} style={{ flex: 1 }} />

    const screenWidth = Dimensions.get('window').width;
    const peek = 56;
    const spacing = 12;
    const cardWidth = screenWidth - (peek + 14);

    const balanceCards = [
      { key: 'saldo', label: 'Saldo atual', value: balance ? balance.total : 'R$ 0,00', bg: '#3b3dbf' },
      { key: 'income', label: 'Entradas', value: balance ? balance.income : 'R$ 0,00', bg: '#00b94a' },
      { key: 'outcome', label: 'Saídas', value: balance ? balance.outcome : 'R$ 0,00', bg: '#ef463a' },
    ];

    const scrollRef = useRef(null);
    const dragging = useRef(false);
    const startX = useRef(0);
    const startScroll = useRef(0);
    const [scrollX, setScrollX] = useState(0);

    function snapToNearest(){
      const interval = cardWidth + spacing;
      const index = Math.round(scrollX / interval);
      const to = index * interval;
      if(scrollRef.current && scrollRef.current.scrollTo){
        scrollRef.current.scrollTo({ x: to, animated: true });
      }
    }

    function handleResponderGrant(e){
      dragging.current = true;
      startX.current = e.nativeEvent.pageX || (e.nativeEvent.touches && e.nativeEvent.touches[0] && e.nativeEvent.touches[0].pageX) || 0;
      startScroll.current = scrollX;
    }

    function handleResponderMove(e){
      if(!dragging.current) return;
      const x = e.nativeEvent.pageX || (e.nativeEvent.touches && e.nativeEvent.touches[0] && e.nativeEvent.touches[0].pageX) || 0;
      const dx = x - startX.current;
      const to = Math.max(0, startScroll.current - dx);
      if(scrollRef.current && scrollRef.current.scrollTo){
        scrollRef.current.scrollTo({ x: to, animated: false });
      }
    }

    function handleResponderRelease(){
      dragging.current = false;
      snapToNearest();
    }

    return(
        <Container>
          <HeaderArea>
            <View
              onStartShouldSetResponder={() => true}
              onResponderGrant={handleResponderGrant}
              onResponderMove={handleResponderMove}
              onResponderRelease={handleResponderRelease}
              style={{ marginBottom: 12 }}
            >
              <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 6 }}
                onScroll={(e) => setScrollX(e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.x : (e.nativeEvent.scrollLeft || 0))}
                scrollEventThrottle={16}
              >
                {balanceCards.map((item, index) => (
                  <BalanceCard key={item.key} bg={item.bg} style={{ width: cardWidth, marginRight: index === balanceCards.length - 1 ? 0 : spacing }}>
                    <CardLabel>{item.label}</CardLabel>
                    <CardValue>{item.value}</CardValue>
                  </BalanceCard>
                ))}
              </ScrollView>
            </View>
          </HeaderArea>

        <SectionTitle>Últimas movimentações</SectionTitle>

        <FlatList
          data={receives}
          keyExtractor={(item) => (item._id || item.id || item.item_id).toString()}
          renderItem={({ item }) => (
            <ReceiveItem data={item} onDelete={handleDelete} />
          )}
        />
      </Container>
    )
}