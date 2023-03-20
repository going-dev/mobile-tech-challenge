import type { ServerResponse, Server, IncomingMessage } from "http";
import mongoose from "mongoose";
import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastify from "fastify";
import { boomify, isBoom, notFound } from "@hapi/boom";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  BadRequestSchema,
  BadImplementationSchema,
  CountrySchema,
} from "./schema";
import type { UpdateCountryParams } from "./controller";
import { listCountries, updateCountry } from "./controller";

export async function createApp() {
  // mongodb
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify().withTypeProvider<TypeBoxTypeProvider>();

  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  // middlewares
  await app.register(require("@fastify/compress") as FastifyPluginCallback);
  await app.register(
    require("@fastify/cors") as FastifyPluginCallback,
    {
      origin: "*",
    } as FastifyRegisterOptions<unknown>
  );
  await app.register(require("@fastify/helmet") as FastifyPluginCallback);

  // error handlers
  app.setNotFoundHandler(async (_req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send(notFound());
  });

  app.setErrorHandler(
    async (error: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
      const boom = isBoom(error) ? error : boomify(error, { statusCode: 400 });

      if (boom.isServer) {
        app.log.error(error);
      }

      return reply
        .code(boom.output.statusCode)
        .type("application/json")
        .headers(boom.output.headers)
        .send(boom.output.payload);
    }
  );

  // schemas
  app.addSchema(BadRequestSchema);
  app.addSchema(BadImplementationSchema);
  app.addSchema(CountrySchema);

  // routes
  app.get(
    "/api/countries",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return listCountries(req, reply);
    }
  );

  app.patch(
    "/api/countries/:id",
    async (req: FastifyRequest<UpdateCountryParams>, reply: FastifyReply) => {
      return updateCountry(req, reply);
    }
  );

  return app;
}

if (process.env.NODE_ENV === "development") {
  (async () => {
    const app = await createApp();
    /// @ts-ignore it's fine that it's deprecated for now
    await app.listen(3001);
  })();
}
