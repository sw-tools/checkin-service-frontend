import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "../../env/server.mjs";
import { createProtectedRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("list", {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const url = `${env.CHECKIN_SERVICE_HOST_URL}/prod/v1/checkin-service/checkins/${userId}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: env.CHECKIN_SERVICE_AUTHORIZER_TOKEN,
        },
      });

      if (!res.ok) {
        const responseBody = (await res.json()) as ExternalError;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: responseBody.error_code,
        });
      }

      const responseBody = (await res.json()) as ExternalListResponseBody;
      return { data: responseBody.data };
    },
  })
  .mutation("create", {
    input: z.object({
      data: z.object({
        confirmation_number: z.string(),
        first_name: z.string(),
        last_name: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const externalRequestBody: ExternalCreateRequestBody = {
        data: {
          user_id: userId,
          reservation: {
            confirmation_number: input.data.confirmation_number,
            first_name: input.data.first_name,
            last_name: input.data.last_name,
          },
        },
      };
      const res = await fetch(
        `${env.CHECKIN_SERVICE_HOST_URL}/prod/v1/checkin-service/checkin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: env.CHECKIN_SERVICE_AUTHORIZER_TOKEN,
          },
          body: JSON.stringify(externalRequestBody),
        }
      );

      if (!res.ok) {
        const responseBody = (await res.json()) as ExternalError;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: responseBody.error_code,
        });
      }

      const responseBody = (await res.json()) as ExternalCreateResponseBody;
      return { data: responseBody.data };
    },
  });

interface ExternalListResponseBody {
  data: Checkin[];
}

interface ExternalCreateRequestBody {
  data: {
    reservation: Reservation;
    user_id: string;
  };
}

interface ExternalCreateResponseBody {
  data: {
    added_checkin_times: CheckinTime[];
    already_scheduled_checkin_times: CheckinTime[];
  };
}

interface Checkin {
  status: "scheduled";
  reservation: Reservation;
  checkin_available_epoch: number;
  departure_timezone: string;
}

export interface Reservation {
  confirmation_number: string;
  first_name: string;
  last_name: string;
}

interface CheckinTime {
  checkin_available_epoch: number;
  checkin_boot_epoch: number;
}

interface ExternalError {
  error: string;
  error_code: string;
}
