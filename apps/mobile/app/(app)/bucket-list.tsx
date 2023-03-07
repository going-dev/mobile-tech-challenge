import { Button, Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import type { ReactElement } from "react";
import { useCallback, useRef } from "react";
import type BottomSheet from "@gorhom/bottom-sheet";
import ScreenWrapper from "~/components/ScreenWrapper";
import {
  useAddBucketListCountries,
  useBucketList,
  useMutateBucketList,
} from "~/api/useBucketList";
import { CountriesSheet } from "~/components/CountriesSheet";
import { CountryListItem } from "~/components/CountryListItem";
import type { Country } from "~/types/country";

export default function BucketList(): ReactElement {
  const bucketList = useBucketList();
  const countries = useAddBucketListCountries();
  const { mutate } = useMutateBucketList();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetOpen = useCallback((): void => {
    bottomSheetRef?.current?.snapToIndex(1);
  }, []);

  return (
    <ScreenWrapper title="Bucket List">
      {bucketList.isLoading || !countries.data?.length ? (
        <Spinner />
      ) : (
        <>
          <FlashList
            data={bucketList.data}
            renderItem={({ item }: { item: Country }): ReactElement => (
              <CountryListItem
                country={item}
                onPress={(): void =>
                  mutate({
                    id: item.id,
                    isBucketList: false,
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
            onPressCountry={(id: number): void =>
              mutate({ id, isBucketList: true })
            }
          />
        </>
      )}
    </ScreenWrapper>
  );
}
