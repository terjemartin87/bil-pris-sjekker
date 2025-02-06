import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { fetchCarData } from "../lib/api"; 
import { useRouter } from "expo-router";

type CarData = {
  kjennemerke: string;
  merke: string;
  modell: string;
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchCarData(searchQuery);
      if (data) {
        setResults([data]); // API-et returnerer ett resultat, så vi legger det i en liste
      } else {
        setResults([]);
        setError("Ingen treff på dette registreringsnummeret.");
      }
    } catch (err) {
      setError("Feil ved henting av data. Prøv igjen.");
      console.error("Feil i API-kall:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Søk etter bil</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv inn skiltnummer"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="characters"
      />
      <Button title="Søk" onPress={handleSearch} disabled={loading} />
      
      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.kjennemerke}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => {
              if (item.kjennemerke) {
                router.push(`/${item.kjennemerke}`);
              } else {
                console.error("Kjennemerke mangler!");
              }
            }}
          >
            <Text style={styles.resultText}>
              {item.kjennemerke} - {item.merke} {item.modell}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  loader: { marginTop: 10 },
  error: { color: "red", marginTop: 10 },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultText: { fontSize: 16 },
});