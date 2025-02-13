import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchCarData } from "../../services/api";
import { CarData } from "../../services/api";

const Kjennemerke = () => {
  const { kjennemerke } = useLocalSearchParams();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!kjennemerke) return;

    fetchCarData(kjennemerke as string)
      .then(setCarData)
      .catch((err) => {
        console.error("Feil ved henting av bildata:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [kjennemerke]);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error) return <Text style={styles.error}>Feil: {error}</Text>;
  if (!carData) return <Text style={styles.error}>Ingen data funnet.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detaljer for bil</Text>
      <Text style={styles.info}>📌 Kjennemerke: {carData.kjennemerke}</Text>
      <Text style={styles.info}>🚗 Merke: {carData.merke}</Text>
      <Text style={styles.info}>📄 Modell: {carData.modell}</Text>
      <Text style={styles.info}>📅 Først registrert: {carData.førsteGangRegistrert}</Text>
      <Text style={styles.info}>⛽ Drivstoff: {carData.drivstoff}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 18, marginVertical: 4 },
  loader: { marginTop: 20 },
  error: { color: "red", marginTop: 20, textAlign: "center", fontSize: 18 },
});

export default Kjennemerke;