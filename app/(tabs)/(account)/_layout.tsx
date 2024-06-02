import { Stack } from "expo-router";
import React from "react";

const AccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="List" />
      <Stack.Screen name="Search" />
    </Stack>
  );
};

export default AccountLayout;
