import type { FastifyReply, FastifyRequest } from "fastify";
import { boomify } from "@hapi/boom";
import { Country } from "./model";

/**
 * listCountries - retrieve the full list of countries
 *
 * @param _req - fastify request
 * @param reply - fastify reply
 */
export async function listCountries(
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const countries = await Country.find();

    return reply.status(200).send(countries);
  } catch (err: unknown) {
    const boom = boomify(err as Error);

    if (boom.isServer) {
      console.error(err);
    }

    return reply.status(boom.output.statusCode).send(boom.output.payload);
  }
}

export type UpdateCountryParams = {
  Params: {
    id: number;
  };
  Body: {
    isVisited?: boolean;
    isBucketList?: boolean;
    isGoing?: boolean;
  };
};

/**
 * updateCountry - update a given country's params by its id
 *
 * @param req - fastify request
 * @param reply - fastify reply
 */
export async function updateCountry(
  req: FastifyRequest<UpdateCountryParams>,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body);

    return reply.status(200).send(country);
  } catch (err: unknown) {
    const boom = boomify(err as Error);

    if (boom.isServer) {
      console.error(err);
    }

    return reply.status(boom.output.statusCode).send(boom.output.payload);
  }
}
