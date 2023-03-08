import { Stack } from "expo-router";
import { Heading, VStack } from "native-base";
import type { ReactElement, ReactNode } from "react";

export default function ScreenWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactElement {
  return (
    <VStack
      safeArea
      p="5"
      justifyContent="space-between"
      flex={1}
      bgColor="gray.100"
    >
      <Stack.Screen />
      <Heading size="2xl" pb="4">
        {title}
      </Heading>
      {children}
    </VStack>
  );
}
