import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="bil/[kjennemerke]" options={{ title: "Bil Detaljer" }} />
      <Stack.Screen name="scan" options={{ title: "Skann bilskilt" }} />
    </Stack>
  );
}