import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchCarData, CarData } from "../services/firebaseApi"; // ✅ Riktig import

export default function CarDetails() {
  const { kjennemerke } = useLocalSearchParams();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kjennemerke) return;

    fetchCarData(kjennemerke as string)
      .then(setCarData)
      .catch(() => {
        Alert.alert("Feil", "Kunne ikke hente bildata.");
      })
      .finally(() => setLoading(false));
  }, [kjennemerke]);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!carData) return <Text style={styles.error}>Ingen data funnet.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚘 Detaljer for bil</Text>
      <Text style={styles.label}>🔹 Kjennemerke: {carData.kjennemerke}</Text>
      <Text style={styles.label}>🏭 Merke: {carData.merke}</Text>
      <Text style={styles.label}>🚗 Modell: {carData.modell}</Text>
      <Text style={styles.label}>📅 Årsmodell: {carData.årsmodell}</Text>
      <Text style={styles.label}>⛽ Drivstoff: {carData.drivstoff}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  loader: { marginTop: 20 },
  error: { color: "red", marginTop: 20, textAlign: "center", fontSize: 16 },
  label: { fontSize: 18, marginBottom: 5 },
});