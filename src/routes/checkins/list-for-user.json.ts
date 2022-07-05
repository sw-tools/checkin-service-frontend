import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import HttpStatus from 'http-status';

export type GetRequestBody = {
  data: {
    user_id: string;
  };
};

export type GetResponseBody = {
  data: {
    checkin_available_epoch: number;
    checkin_boot_epoch: number;
    confirmation_number: string;
    status: 'scheduled';
  }[];
};

export type GetErrorResponseBody = {
  error: string;
};

/**
 * This pass-through keeps endpoint and authorizer token secret from the frontend
 */
export const get: RequestHandler<never, string, GetResponseBody | GetErrorResponseBody> = async (req) => {
  let responseBody: MaybePromise<void | EndpointOutput<GetResponseBody | GetErrorResponseBody>>;
  try {
    responseBody = await getInternal(req);
  } catch (error) {
    console.error(error);
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      // hide the external API's error from the public with a generic error message
      body: { error: 'Internal server error' }
    };
  }
  return responseBody;
};

async function getInternal(req: ServerRequest<never, string>) {
  const requestBody = JSON.parse(req.body) as GetRequestBody;
  const externalRequestBody: ExternalGetRequestBody = {
    data: { user_id: requestBody.data.user_id }
  };
  const res = await fetch(`${process.env.HOST_URL}/v1/checkin-service/checkins`, {
    headers: {
      'Content-Type': 'application/json',
      token: process.env.AUTHORIZER_TOKEN
    },
    body: JSON.stringify(externalRequestBody)
  });

  if (!res.ok) {
    const responseBody = await res.json();
    throw new Error(JSON.stringify(responseBody));
  }

  const responseBody = (await res.json()) as ExternalGetResponseBody;
  return {
    status: res.status,
    body: responseBody
  };
}

interface ExternalGetRequestBody {
  data: {
    user_id: string;
  };
}

interface ExternalGetResponseBody {
  data: {
    checkin_available_epoch: number;
    checkin_boot_epoch: number;
    confirmation_number: string;
    status: 'scheduled';
  }[];
}
