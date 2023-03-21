import { Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import type { ReactElement } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  useAddBucketListCountries,
  useBucketList,
  useMutateBucketList,
} from "../../api/useBucketList";
import { CountryListItem } from "../../components/CountryListItem";
import type { Country } from "../../types/country";

export default function BucketList(): ReactElement {
  const bucketList = useBucketList();
  const countries = useAddBucketListCountries();
  const { mutate } = useMutateBucketList();

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
                    _id: item._id,
                    isBucketList: false,
                  })
                }
              />
            )}
            estimatedItemSize={100}
          />
        </>
      )}
    </ScreenWrapper>
  );
}
