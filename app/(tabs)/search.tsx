import React from 'react';
import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Søk etter bil!</Text>
    </View>
  );
}