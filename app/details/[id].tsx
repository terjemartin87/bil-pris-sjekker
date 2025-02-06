import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

type CarData = {
  kjennemerke: string;
  merke: string;
  modell: string;
  forstegangsregistrering: string;
  drivstoff: string;
  egenvekt: number;
};

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`https://api.vegvesen.no/v1/kjoretoydata/${id}`, {
          headers: {
            "X-API-KEY": "6ca7ee36-fcc0-4f1d-acb5-235d55f75f15",
          },
        });
        const data: CarData = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Feil ved henting av bildata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarData();
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!carData) {
    return <Text>Fant ingen data for dette skiltet.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bilinformasjon</Text>
      <Text>Skiltnummer: {carData.kjennemerke}</Text>
      <Text>Merke: {carData.merke}</Text>
      <Text>Modell: {carData.modell}</Text>
      <Text>Førstegangsregistrering: {carData.forstegangsregistrering}</Text>
      <Text>Drivstoff: {carData.drivstoff}</Text>
      <Text>Egenvekt: {carData.egenvekt} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});