import { Handler, schedule } from "@netlify/functions";
import { prisma } from "../../src/server/db/client";

/**
 * Serverless cron job that keeps free tier Planetscale database alive
 */
const handler: Handler = async () => {
  await prisma.caffeinateMessage.create({ data: { message: "Stay awake!" } });

  return { statusCode: 200 };
};

/** run once a day at midnight UTC */
module.exports.handler = schedule("0 0 12 1/1 * ? *", handler);
