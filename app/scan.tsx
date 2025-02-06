import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Venter på kameratilgang...</Text>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Ingen tilgang til kamera</Text>
        <Button title="Gi tilgang" onPress={requestPermission} />
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Bilde tatt:", photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type} />
      <View style={styles.buttonContainer}>
        <Button
          title="Bytt Kamera"
          onPress={() =>
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }
        />
        <Button title="Ta bilde" onPress={handleCapture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
});