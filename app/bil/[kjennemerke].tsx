import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { CarData } from "../../services/api"; // Importerer typen CarData

const CarDetails = () => {
  const { kjennemerke } = useLocalSearchParams(); // Henter skiltnummer fra URL
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!kjennemerke) return;

    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/kjoretoy/${kjennemerke}`);
        if (!response.ok) {
          throw new Error(`HTTP-feil! Status: ${response.status}`);
        }
        const rawData = await response.json();

        // Sjekker at data finnes
        const kjoretoyData = rawData.kjoretoydataListe?.[0];
        if (!kjoretoyData) {
          throw new Error("Ingen kjøretøysdata funnet.");
        }

        const tekniskeData = kjoretoyData.godkjenning.tekniskGodkjenning.tekniskeData;

        // Oppdaterer state med riktige datafelt
        setCarData({
          kjennemerke: kjoretoyData.kjoretoyId.kjennemerke,
          merke: tekniskeData.generelt.merke[0].merke,
          modell: tekniskeData.generelt.handelsbetegnelse[0],
          førsteGangRegistrert: kjoretoyData.registrering.forstegangsregistreringNorge,
          drivstoff: tekniskeData.miljodata.miljoOgdrivstoffGruppe[0].drivstoffKodeMiljodata.kodeNavn,
        });
      } catch (error: any) {
        console.error("Feil ved henting av bildata:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [kjennemerke]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>Feil: {error}</Text>;
  }

  if (!carData) {
    return <Text style={styles.error}>Ingen data funnet.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detaljer for bil</Text>
      <Text>Kjennemerke: {carData.kjennemerke}</Text>
      <Text>Merke: {carData.merke}</Text>
      <Text>Modell: {carData.modell}</Text>
      <Text>Registrert første gang: {carData.førsteGangRegistrert}</Text>
      <Text>Drivstoff: {carData.drivstoff}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  loader: { marginTop: 20 },
  error: { color: "red", marginTop: 20, textAlign: "center" },
});

export default CarDetails;