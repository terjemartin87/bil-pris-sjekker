import { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { Camera } from "expo-camera";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Venter på kameratilgang...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Ingen tilgang til kamera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} />
      <Button title="Ta bilde" onPress={() => console.log("Bilde tatt!")} />
    </View>
  );
}