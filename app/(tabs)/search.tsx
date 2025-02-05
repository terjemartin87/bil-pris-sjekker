import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Hent lagret søkehistorikk
    const loadSearchHistory = async () => {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) setSearchHistory(JSON.parse(history));
    };
    loadSearchHistory();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    const newHistory = [searchQuery, ...searchHistory];
    setSearchHistory(newHistory);
    setSearchQuery("");

    // Lagre historikk lokalt
    await AsyncStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem("searchHistory");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Søk etter bil</Text>

      <TextInput
        style={styles.input}
        placeholder="Skriv inn skiltnummer, merke eller modell..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Søk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/scan")}>
          <Text style={styles.buttonText}>Skann skilt</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Tidligere søk:</Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/details/${item}`)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.buttonText}>Slett historikk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  input: { 
    height: 50, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    marginBottom: 10, 
    backgroundColor: "#fff" 
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 10 
  },
  button: { 
    backgroundColor: "#007AFF", 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    alignItems: "center", 
    flex: 1, 
    marginHorizontal: 5 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  card: { 
    backgroundColor: "#fff", 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 2 
  },
  cardText: { 
    fontSize: 16, 
    fontWeight: "500" 
  },
  clearButton: { 
    backgroundColor: "#FF3B30", 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 20 
  }
});