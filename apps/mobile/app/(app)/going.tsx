import { Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import type { ReactElement } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  useAddGoingCountries,
  useGoing,
  useMutateGoing,
} from "../../api/useGoing";
import { CountryListItem } from "../../components/CountryListItem";
import type { Country } from "../../types/country";

export default function Going(): ReactElement {
  const going = useGoing();
  const countries = useAddGoingCountries();
  const { mutate } = useMutateGoing();

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
        </>
      )}
    </ScreenWrapper>
  );
}
