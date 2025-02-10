import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface CarData {
  kjennemerke: string;
  modell: string;
  merke: string;
}

const CarDetails = () => {
  const { kjennemerke } = useLocalSearchParams(); // Henter skiltnummer fra URL
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kjennemerke) return;

    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/kjoretoy/${kjennemerke}`);
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Feil ved henting av bildata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [kjennemerke]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!carData) {
    return <Text>Fant ingen data for dette kjennemerket.</Text>;
  }

  return (
    <View>
      <Text>Kjennemerke: {carData?.kjennemerke || "Ukjent"}</Text>
      <Text>Modell: {carData?.modell || "Ukjent"}</Text>
      <Text>Merke: {carData?.merke || "Ukjent"}</Text>
    </View>
  );
};

export default CarDetails;