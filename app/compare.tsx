import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchCarData, fetchCarModels } from "../services/firebaseApi"; // ✅ Riktig API

export default function ComparePricesScreen() {
  const [selectedCar, setSelectedCar] = useState("");
  const [carData, setCarData] = useState<{ gjennomsnitt_salgspris: number; gjennomsnitt_kjøpspris: number } | null>(null);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCarModels()
      .then(setCarModels)
      .catch(() => Alert.alert("Feil", "Kunne ikke hente bilmodeller."));
  }, []);

  useEffect(() => {
    if (selectedCar) {
      setLoading(true);
      fetchCarData(selectedCar)
        .then((data) => {
          if (data) {
            setCarData({
              gjennomsnitt_salgspris: Math.floor(Math.random() * 100000), // Dummy-verdier for testing
              gjennomsnitt_kjøpspris: Math.floor(Math.random() * 80000),
            });
          } else {
            setCarData(null);
          }
        })
        .catch(() => Alert.alert("Feil", "Kunne ikke hente bilpriser."))
        .finally(() => setLoading(false));
    }
  }, [selectedCar]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Sammenlign bilpriser</Text>
      <Picker selectedValue={selectedCar} onValueChange={setSelectedCar} style={styles.picker}>
        <Picker.Item label="Velg en bilmodell" value="" />
        {carModels.map((model) => (
          <Picker.Item key={model} label={model} value={model} />
        ))}
      </Picker>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {carData && !loading && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>💰 Gjennomsnittlig salgspris: {carData.gjennomsnitt_salgspris.toLocaleString()} kr</Text>
          <Text style={styles.priceText}>🛒 Gjennomsnittlig kjøpspris: {carData.gjennomsnitt_kjøpspris.toLocaleString()} kr</Text>
        </View>
      )}
    </View>
  );
}

// 🔹 STYLES
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  picker: { height: 50, width: "100%", backgroundColor: "white" },
  loader: { marginTop: 20 },
  priceContainer: { marginTop: 20, padding: 15, backgroundColor: "white", borderRadius: 8 },
  priceText: { fontSize: 18, marginVertical: 4, fontWeight: "bold" },
});