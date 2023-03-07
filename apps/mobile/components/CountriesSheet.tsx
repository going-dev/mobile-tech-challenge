import type { ReactElement } from "react";
import { useMemo, useCallback, forwardRef } from "react";
import {
  CloseIcon,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
} from "native-base";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import type { Country } from "~/types/country";

export const CountriesSheet = forwardRef<
  BottomSheet,
  { countries: Country[]; onPressCountry: (id: number) => void }
>(({ countries, onPressCountry }, ref) => {
  const snapPoints = useMemo((): string[] => ["1%", "90%"], []);

  const handleSheetClose = useCallback((): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ref?.current?.close();
  }, []);

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={snapPoints}>
      <HStack justifyContent="space-between" width="90%" mx="auto" pb="5">
        <Heading size="xl">Countries</Heading>
        <Pressable onPress={handleSheetClose}>
          <CloseIcon mt="2" />
        </Pressable>
      </HStack>
      <BottomSheetFlatList
        contentContainerStyle={{
          backgroundColor: "white",
        }}
        data={countries}
        renderItem={({ item }: { item: Country }): ReactElement => (
          <Pressable
            w="90%"
            mx="auto"
            onPress={() => {
              onPressCountry(item.id);
              handleSheetClose();
            }}
          >
            <Text fontSize="xl" fontWeight="500">
              {item.flag} {item.name}
            </Text>
            <Divider my="3" />
          </Pressable>
        )}
        keyExtractor={(i) => i.isoCode}
      />
    </BottomSheet>
  );
});
