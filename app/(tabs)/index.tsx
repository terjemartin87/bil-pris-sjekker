import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Velkommen til BilSjekk!</Text>
      <Link href="/tabs/search">Gå til søk</Link>
      <Link href="/tabs/explore">Utforsk</Link>
    </View>
  );
}