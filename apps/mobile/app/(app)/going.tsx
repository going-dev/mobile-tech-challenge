import { Button, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { ReactElement, useCallback, useRef } from "react";
import type BottomSheet from "@gorhom/bottom-sheet";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  useAddGoingCountries,
  useGoing,
  useMutateGoing,
} from "../../api/useGoing";
import { CountryListItem } from "../../components/CountryListItem";
import type { Country } from "../../types/country";
import { CountriesSheet } from "../../components/CountriesSheet";

export default function Going(): ReactElement {
  const going = useGoing();
  const countries = useAddGoingCountries();
  const { mutate } = useMutateGoing();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetOpen = useCallback((): void => {
    bottomSheetRef?.current?.snapToIndex(1);
  }, []);

  return (
    <ScreenWrapper title="Where I'm Going">
      {going.isLoading || !countries.data?.length ? (
        <Spinner />
      ) : (
        <>
          <FlashList
            data={going.data}
            renderItem={({ item }: { item: Country }): ReactElement => (
              <CountryListItem
                country={item}
                onPressDelete={(): void =>
                  mutate({
                    _id: item._id,
                    isGoing: false,
                  })
                }
              />
            )}
            estimatedItemSize={100}
          />
          <Button onPress={handleSheetOpen}>Add more</Button>
          <CountriesSheet
            ref={bottomSheetRef}
            countries={countries?.data}
            onPressCountry={(_id: number): void =>
              mutate({ _id, isGoing: true })
            }
          />
        </>
      )}
    </ScreenWrapper>
  );
}
