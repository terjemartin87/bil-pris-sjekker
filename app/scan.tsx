import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const scan = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text style={styles.message}>Ber om kameratilgang...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.message}>Ingen kameratilgang</Text>;
  }

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      router.push("/search"); // Simulerer scanning og sender brukeren til søkesiden
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="camera" size={100} color="blue" style={styles.icon} />
      <Text style={styles.message}>{scanning ? "Scanning..." : "Trykk for å scanne"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleScan} disabled={scanning}>
        <Text style={styles.buttonText}>{scanning ? "Scanning..." : "Start scanning"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default scan;