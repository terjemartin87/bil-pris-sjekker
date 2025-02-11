import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const search = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (licensePlate.trim()) {
      router.push(`/bil/${licensePlate}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/BilSjekkLogo.png")} style={styles.logo} />
      <Text style={styles.title}>Søk etter bil</Text>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Skriv inn skiltnummer"
          value={licensePlate}
          onChangeText={setLicensePlate}
          autoCapitalize="characters"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Søk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    height: 50,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default search;
