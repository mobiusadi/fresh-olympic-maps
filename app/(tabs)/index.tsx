// app/(tabs)/index.tsx
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Map from '../../components/Map';
import ListComponent from '../../components/ListComponent';
import { LocationData } from '../../types';

const locationsData: LocationData[] = require('../../assets/incidents_data.json');

export default function TabScreen() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const mapRef = useRef<any>(null);
  const listRef = useRef<FlatList<LocationData>>(null);

  const onMarkerPress = (incident: LocationData) => {
    setSelectedId(incident.id);
    const index = locationsData.findIndex(item => item.id === incident.id);
    if (index !== -1 && listRef.current) {
      listRef.current.scrollToIndex({ index });
    }
  };

  const onCardPress = (incident: LocationData) => {
    setSelectedId(incident.id);
    if (mapRef.current?.panTo) {
      mapRef.current.panTo({
        lat: incident.coordinates.latitude,
        lng: incident.coordinates.longitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map
          ref={mapRef}
          locationsData={locationsData}
          selectedIncidentId={selectedId}
          onMarkerPress={onMarkerPress}
          initialRegion={{ latitude: 40, longitude: -30 }}
        />
      </View>
      <View style={styles.listContainer}>
        <ListComponent
          listRef={listRef}
          locationsData={locationsData}
          selectedIncidentId={selectedId}
          onCardPress={onCardPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  mapContainer: { flex: 3 },
  listContainer: { flex: 2, borderTopWidth: 1, borderTopColor: '#ccc' },
});