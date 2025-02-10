import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="search" options={{ title: "Søk" }} />
      <Tabs.Screen name="bil/[kjennemerke]" options={{ title: "Bilinfo" }} />
    </Tabs>
  );
}