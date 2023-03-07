import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon, Text } from "native-base";
import type { ReactElement } from "react";

export default function AppLayout(): ReactElement {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          marginTop: 10,
          borderTopColor: "transparent",
        },
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text
              fontWeight={focused ? 600 : 400}
              color={focused ? "primary.600" : "muted.700"}
            >
              {children}
            </Text>
          );
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName: string;

          const iconColor = focused ? "primary.600" : "muted.700";

          switch (route.name) {
            case "visited":
              iconName = "map-check-outline";
              break;
            case "bucket-list":
              iconName = "map-legend";
              break;
            case "going":
              iconName = "map-clock-outline";
              break;
          }

          return (
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size={size}
              color={iconColor}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="visited"
        options={{ title: "Visited", headerShown: false }}
      />
      <Tabs.Screen
        name="bucket-list"
        options={{ title: "Bucket List", headerShown: false }}
      />
      <Tabs.Screen
        name="going"
        options={{ title: "Going", headerShown: false }}
      />
    </Tabs>
  );
}
