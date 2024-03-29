import type { HttpStatusCode, AxiosResponse } from "axios";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Country } from "../types/country";
import { queryClient, api } from "./instance";

export function useVisited(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["visited"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => d.isVisited)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useAddVisitedCountries(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["visitedAdditions"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => !d.isVisited)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useMutateVisited(): UseMutationResult<HttpStatusCode> {
  return useMutation({
    mutationFn: ({
      _id,
      isVisited,
    }: Pick<Country, "_id" | "isVisited">): Promise<HttpStatusCode> =>
      api
        .patch(`/countries/${_id}`, {
          isVisited,
        })
        .then((res: AxiosResponse) => res.status),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ["visited"] });
      await queryClient.invalidateQueries({ queryKey: ["visitedAdditions"] });
    },
  });
}
