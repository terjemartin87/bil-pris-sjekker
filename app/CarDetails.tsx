import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchCarData, CarData } from "../services/api"; // Legger til riktig import

const CarDetails = () => {
  const { kjennemerke } = useLocalSearchParams();
  const [carData, setCarData] = useState<CarData | null>(null);

  useEffect(() => {
    if (!kjennemerke) return;

    const loadCarData = async () => {
      const data = await fetchCarData(kjennemerke as string);
      setCarData(data);
    };

    loadCarData();
  }, [kjennemerke]);

  if (!carData) {
    return <Text style={styles.loadingText}>Laster data...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bilinformasjon</Text>
      <View style={styles.card}>
        <FontAwesome5 name="car" size={50} color="#007AFF" style={styles.icon} />
        <InfoRow label="Kjennemerke" value={carData.kjennemerke} />
        <InfoRow label="Merke" value={carData.merke} />
        <InfoRow label="Modell" value={carData.modell} />
        <InfoRow label="Årsmodell" value={carData.årsmodell} />
        <InfoRow label="Første registrert" value={carData.førsteGangRegistrert} />
        <InfoRow label="Farge" value={carData.farge} />
        <InfoRow label="Vekt" value={carData.vekt} />
        <InfoRow label="Antall seter" value={carData.antallSeter} />
        <InfoRow label="Motoreffekt" value={carData.effekt} />
        <InfoRow label="Girkasse" value={carData.girkasse} />
        <InfoRow label="CO₂-utslipp" value={carData.co2Utslipp} />
        <InfoRow label="Drivstoff" value={carData.drivstoff} />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});

export default CarDetails;