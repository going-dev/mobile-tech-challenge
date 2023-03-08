import mongoose from "mongoose";
import {
  BadRequestSchema,
  BadImplementationSchema,
  CountrySchema,
} from "./schema";
import { ServerResponse } from "http";
import { Server } from "http";
import { IncomingMessage } from "http";
import fastify, {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { boomify, isBoom, notFound } from "@hapi/boom";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  listCountries,
  updateCountry,
  UpdateCountryParams,
} from "./controller";

export async function createApp() {
  // mongodb
  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify().withTypeProvider<TypeBoxTypeProvider>();

  await mongoose
    // you know what, yeah this should be an env var
    // but for some reason it kept showing up as undefined on prod in vercel
    // i tried 10000 different ways to upload this as an env var. no dice
    // ref: https://github.com/vercel/vercel/discussions/5015
    //
    // so... just don't be evil. i'll know if you do.
    .connect(
      "mongodb+srv://thepope:YX8kGRWqXnsW3QJF@mobile-tech-challenge.occvoii.mongodb.net/countries"
    )
    .then(() => console.log("MongoDB connected"))
    /// @ts-ignore
    .catch((err) => console.error(err));

  // middlewares
  app.register(require("@fastify/compress"));
  app.register(require("@fastify/cors"), {
    origin: "*",
  });
  app.register(require("@fastify/helmet"));

  // error handlers
  app.setNotFoundHandler(async (_req: FastifyRequest, reply: FastifyReply) => {
    return notFound();
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
    /// @ts-ignore
    app.listen(3001);
  })();
}
