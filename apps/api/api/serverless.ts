import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../src/server";

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = await createApp();

  await app.ready();

  app.server.emit("request", req, res);
};
