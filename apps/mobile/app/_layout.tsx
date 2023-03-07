import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import type { ReactElement } from "react";
import { NativeBaseProvider } from "native-base";
import { queryClient } from "~/api/instance";
import { AuthProvider } from "~/context/auth";

export default function RootLayout(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
