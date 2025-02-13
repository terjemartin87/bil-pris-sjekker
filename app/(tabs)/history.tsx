import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

interface Car {
  kjennemerke: string;
  merke: string;
  modell: string;
  favoritt: boolean;
}

export default function history() {
  const [history, setHistory] = useState<Car[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadHistory();
  }, []);

  // Henter historikk fra AsyncStorage
  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem("carHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  };

  // Lagrer historikk tilbake til AsyncStorage
  const saveHistory = async (updatedHistory: Car[]) => {
    await AsyncStorage.setItem("carHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  // Legger til/fjerner favoritt
  const toggleFavorite = async (kjennemerke: string) => {
    const updatedHistory = history.map(car =>
      car.kjennemerke === kjennemerke ? { ...car, favoritt: !car.favoritt } : car
    );
    await saveHistory(updatedHistory);
  };

  // Går til søkesiden med valgt bil
  const handleCarPress = (kjennemerke: string) => {
    router.push(`/search?plate=${kjennemerke}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine søk</Text>
      {history.length === 0 ? (
        <Text style={styles.noHistoryText}>Ingen søk enda.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.kjennemerke}
          renderItem={({ item }) => (
            <View style={styles.carItem}>
              <TouchableOpacity onPress={() => handleCarPress(item.kjennemerke)}>
                <Text style={styles.carText}>{item.merke} {item.modell} ({item.kjennemerke})</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item.kjennemerke)}>
                <FontAwesome name={item.favoritt ? "star" : "star-o"} size={24} color="gold" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  noHistoryText: { textAlign: "center", fontSize: 16, color: "gray" },
  carItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carText: { fontSize: 18 },
});