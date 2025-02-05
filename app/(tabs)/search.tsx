import { useState } from "react";
import { View, TextInput, Button, Text, FlatList } from "react-native";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearchHistory([...searchHistory, searchQuery]);
      setSearchQuery("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Søkefelt */}
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Søk etter bil..."
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <Button title="Søk" onPress={handleSearch} />

      <Button title="Skann skilt" onPress={() => router.push("/scan")} />

      {/* Tidligere søk */}
      <Text style={{ fontSize: 18, marginTop: 20 }}>Tidligere søk:</Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, backgroundColor: "#f0f0f0", marginVertical: 5 }}>
            {item}
          </Text>
        )}
      />

      {/* Slett historikk-knapp */}
      {searchHistory.length > 0 && (
        <Button title="Slett historikk" onPress={() => setSearchHistory([])} />
      )}
    </View>
  );
}