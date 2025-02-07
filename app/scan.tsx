import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Camera } from "expo-camera";

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // RIKTIG METODE
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Ber om kameratilgang...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Ingen kameratilgang</Text>;
  }

  return (
    <View>
      <Text>Kamera er klart</Text>
      <Button title="Start scanning" onPress={() => console.log("Scanning...")} />
    </View>
  );
};

export default ScanScreen;