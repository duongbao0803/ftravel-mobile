import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
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
      <Stack.Screen name="VerifyOtp" />
    </Stack>
  );
};

export default RootLayout;
