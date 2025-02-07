import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

const CarDetails = ({ route }: any) => {
  const { kjennemerke } = route.params;
  const [carData, setCarData] = useState<{ kjennemerke: string; modell: string; merke: string } | null>(null);

  useEffect(() => {
    // Henter bildata (simulert API-kall)
    const fetchCarData = async () => {
      try {
        const response = await fetch(`https://api.example.com/cars/${kjennemerke}`);
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Feil ved henting av bildata:", error);
      }
    };

    fetchCarData();
  }, [kjennemerke]);

  if (!carData) {
    return <Text>Laster data...</Text>;
  }

  return (
    <View>
      <Text>Kjennemerke: {carData.kjennemerke}</Text>
      <Text>Modell: {carData.modell}</Text>
      <Text>Merke: {carData.merke}</Text>
    </View>
  );
};

export default CarDetails;