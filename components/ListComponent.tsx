// components/ListComponent.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ITEM_HEIGHT = 80;

const ListComponent = ({ locationsData, selectedIncidentId, onCardPress, listRef }: any) => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, selectedIncidentId === item.id && styles.selectedCard]}
      onPress={() => onCardPress(item)}
    >
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.location_name}</Text>
        <Text style={styles.cardSubTitle}>{item.country} - {item.year}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ref={listRef}
      data={locationsData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1, width: '100%' },
  card: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', height: ITEM_HEIGHT, justifyContent: 'center' },
  selectedCard: { backgroundColor: '#e0f7ff' },
  cardDetails: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubTitle: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default ListComponent;