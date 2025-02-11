import { CloseIcon, HStack, Pressable, Text } from "native-base";
import type { ReactElement } from "react";
import type { Country } from "../types/country";

export function CountryListItem({
  country,
  onPressDelete,
}: {
  country: Country;
  onPressDelete: () => void;
}): ReactElement {
  return (
    <HStack w="100%" justifyContent="space-between">
      <Text fontSize="xl" fontWeight="500">
        {country.flag} {country.name}
      </Text>
      <Pressable onPress={onPressDelete}>
        <CloseIcon mt="2" />
      </Pressable>
    </HStack>
  );
}
