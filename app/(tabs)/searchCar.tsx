import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { fetchCarModels } from "../../services/firebaseApi"; // ✅ Bruker riktig API

export default function SearchCar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<string[]>([]);
  const [allCars, setAllCars] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarModels()
      .then((models) => {
        setAllCars(models);
        setFilteredCars(models);
      })
      .catch(() => Alert.alert("Feil", "Kunne ikke hente bilmodeller."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = allCars.filter((car) => car.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredCars(filtered);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔎 Søk etter bil</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv inn bilmodell..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.carItem}>
              <Text style={styles.carText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

// 🔹 STYLES
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
  loader: { marginTop: 20 },
  carItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  carText: { fontSize: 18 },
});