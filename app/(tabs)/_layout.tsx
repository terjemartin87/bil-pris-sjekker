import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Hjem", 
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="search-car" 
        options={{ 
          title: "Søk etter bil", 
          tabBarIcon: ({ color }) => <FontAwesome name="car" size={28} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: "Søk etter skiltnr", 
          tabBarIcon: ({ color }) => <FontAwesome name="id-card" size={28} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="scan" 
        options={{ 
          title: "Scan skilt", 
          tabBarIcon: ({ color }) => <FontAwesome name="camera" size={28} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: "Historikk", 
          tabBarIcon: ({ color }) => <FontAwesome name="clock-o" size={28} color={color} /> 
        }} 
      />
    </Tabs>
  );
}