import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosResponse, HttpStatusCode } from "axios";
import type { Country } from "../types/country";
import { queryClient, api } from "./instance";

export function useBucketList(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["bucketlist"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => d.isBucketList)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useAddBucketListCountries(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["bucketlistAdditions"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => !d.isBucketList)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useMutateBucketList(): UseMutationResult<HttpStatusCode> {
  return useMutation({
    mutationFn: ({
      _id,
      isBucketList,
    }: Pick<Country, "_id" | "isBucketList">): Promise<HttpStatusCode> =>
      api
        .patch(`/countries/${_id}`, {
          isBucketList,
        })
        .then((res: AxiosResponse) => res.status),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ["bucketlist"] });
      await queryClient.invalidateQueries({
        queryKey: ["bucketlistAdditions"],
      });
    },
  });
}
