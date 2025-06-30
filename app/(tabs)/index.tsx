// app/(tabs)/index.tsx - Simplified for Map Test

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapWrapper from '../../components/Map';

export default function TabScreen() {
  return (
    <View style={styles.container}>
      <MapWrapper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});