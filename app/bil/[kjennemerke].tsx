import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchCarData } from "../../lib/api";

export default function CarDetailScreen() {
  const { kjennemerke } = useLocalSearchParams();
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCarData = async () => {
      if (!kjennemerke) return;
      try {
        const data = await fetchCarData(kjennemerke as string);
        setCarData(data);
      } catch (err) {
        setError("Feil ved henting av bilinformasjon.");
      } finally {
        setLoading(false);
      }
    };

    getCarData();
  }, [kjennemerke]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!carData) {
    return <Text style={styles.error}>Ingen data funnet.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carData.merke} {carData.modell}</Text>
      <Text style={styles.detail}>Skiltnummer: {carData.kjennemerke}</Text>
      <Text style={styles.detail}>Årsmodell: {carData.arsmodell}</Text>
      <Text style={styles.detail}>Farge: {carData.farge}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  detail: { fontSize: 18, marginBottom: 5 },
  loader: { marginTop: 20 },
  error: { color: "red", marginTop: 20 },
});