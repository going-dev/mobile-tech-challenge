import { CloseIcon, HStack, Pressable, Text } from "native-base";
import type { ReactElement } from "react";
import type { Country } from "~/types/country";

export function CountryListItem({
  country,
  onPress,
}: {
  country: Country;
  onPress: () => void;
}): ReactElement {
  return (
    <HStack w="100%" justifyContent="space-between">
      <Text fontSize="xl" fontWeight="500">
        {country.flag} {country.name}
      </Text>
      <Pressable onPress={onPress}>
        <CloseIcon mt="2" />
      </Pressable>
    </HStack>
  );
}
