import { FastifyReply, FastifyRequest } from "fastify";
import { badRequest } from "@hapi/boom";
import { Country } from "./model";

export async function listCountries(
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const countries = await Country.find();
    return reply.status(200).send(countries);
  } catch (err) {
    return reply.status(400).send(badRequest());
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

export async function updateCountry(
  req: FastifyRequest<UpdateCountryParams>,
  reply: FastifyReply
): Promise<FastifyReply> {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body);
    return reply.status(200).send(country);
  } catch (err) {
    console.error(err);
    return reply.status(400).send(badRequest());
  }
}
