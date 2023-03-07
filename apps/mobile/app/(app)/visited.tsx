import { Spinner } from "native-base";
import { FlashList } from "@shopify/flash-list";
import type { ReactElement } from "react";
import ScreenWrapper from "~/components/ScreenWrapper";
import {
  useAddVisitedCountries,
  useVisited,
  useMutateVisited,
} from "~/api/useVisited";
import { CountryListItem } from "~/components/CountryListItem";
import type { Country } from "~/types/country";

export default function Visited(): ReactElement {
  const visited = useVisited();
  const countries = useAddVisitedCountries();
  const { mutate } = useMutateVisited();

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
                onPress={(): void =>
                  mutate({
                    id: item.id,
                    isVisited: false,
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
