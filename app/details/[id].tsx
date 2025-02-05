import { useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams(); // Henter ID fra URL
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Informasjon om bil (ID: {id})
      </Text>
      <Text>Her kommer detaljert info om bilen...</Text>
    </View>
  );
}