import { Button, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { ReactElement, useCallback, useRef } from "react";
import type BottomSheet from "@gorhom/bottom-sheet";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  useAddVisitedCountries,
  useVisited,
  useMutateVisited,
} from "../../api/useVisited";
import { CountryListItem } from "../../components/CountryListItem";
import type { Country } from "../../types/country";
import { CountriesSheet } from "../../components/CountriesSheet";

export default function Visited(): ReactElement {
  const visited = useVisited();
  const countries = useAddVisitedCountries();
  const { mutate } = useMutateVisited();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetOpen = useCallback((): void => {
    bottomSheetRef?.current?.snapToIndex(1);
  }, []);

  return (
    <ScreenWrapper title="Where I've Been">
      {visited.isLoading || !countries.data?.length ? (
        <Spinner />
      ) : (
        <>
          <FlashList
            data={visited.data}
            renderItem={({ item }: { item: Country }): ReactElement => (
              <CountryListItem
                country={item}
                onPressDelete={(): void =>
                  mutate({
                    _id: item._id,
                    isVisited: false,
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
              mutate({ _id, isBucketList: true })
            }
          />
        </>
      )}
    </ScreenWrapper>
  );
}
