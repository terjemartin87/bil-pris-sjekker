import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, useCameraDevices, CameraDevice } from "react-native-vision-camera";
import TextRecognition from "react-native-text-recognition";
import { FontAwesome } from "@expo/vector-icons";

export default function scan() {
  const devices = useCameraDevices();
  const device: CameraDevice | null = devices.find((d) => d.position === "back") ?? null;

  const [text, setText] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text style={styles.error}>Sjekker kameratilgang...</Text>;
  }

  if (hasPermission === false) {
    return <Text style={styles.error}>Kameratilgang nektet!</Text>;
  }

  if (!device) {
    return <Text style={styles.error}>Ingen bakre kamera tilgjengelig</Text>;
  }

  const handleScan = async (photoPath: string) => {
    try {
      const recognizedText = await TextRecognition.recognize(photoPath);
      setText(recognizedText.join(" "));
    } catch (error) {
      console.error("Feil ved tekstgjenkjenning:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} device={device} isActive={true} />
      <TouchableOpacity style={styles.scanButton} onPress={() => handleScan("path/to/image")}>
        <FontAwesome name="camera" size={24} color="white" />
        <Text style={styles.scanText}>Skann</Text>
      </TouchableOpacity>
      {text && <Text style={styles.resultText}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  camera: { width: "100%", height: 400 },
  scanButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginTop: 10 },
  scanText: { color: "white", marginLeft: 10, fontSize: 16 },
  resultText: { marginTop: 20, fontSize: 16 },
  error: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
});