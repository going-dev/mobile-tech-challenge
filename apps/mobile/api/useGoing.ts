import type { HttpStatusCode, AxiosResponse } from "axios";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Country } from "../types/country";
import { queryClient, api } from "./instance";

export function useGoing(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["going"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => d.isGoing)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useAddGoingCountries(): UseQueryResult<Country[]> {
  return useQuery({
    queryKey: ["goingAdditions"],
    queryFn: (): Promise<void | Country[]> =>
      api
        .get("/countries")
        .then(({ data }: AxiosResponse<Country[]>) =>
          data
            .filter((d) => !d.isGoing)
            .sort((a, z) => a.name.localeCompare(z.name))
        )
        .catch((err) => console.error(err)),
  });
}

export function useMutateGoing(): UseMutationResult<HttpStatusCode> {
  return useMutation({
    mutationFn: ({
      _id,
      isGoing,
    }: Pick<Country, "_id" | "isGoing">): Promise<HttpStatusCode> =>
      api
        .patch(`/countries/${_id}`, {
          isGoing,
        })
        .then((res: AxiosResponse) => res.status),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ["going"] });
      await queryClient.invalidateQueries({ queryKey: ["goingAdditions"] });
    },
  });
}
