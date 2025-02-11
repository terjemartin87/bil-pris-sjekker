import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/BilSjekkLogo.png")} style={styles.logo} />
      <Text style={styles.title}>Velkommen til BilSjekk</Text>
      <Text style={styles.subtitle}>Finn informasjon om bilen din raskt og enkelt</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/search")}> 
        <Text style={styles.buttonText}>Søk etter bil</Text>
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default index;