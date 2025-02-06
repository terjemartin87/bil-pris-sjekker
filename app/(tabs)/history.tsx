import { View, Text, StyleSheet } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine søk</Text>
      <Text>Her kan du se dine tidligere søk.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});