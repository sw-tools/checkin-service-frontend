import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import HttpStatus from 'http-status';

export type PostRequestBody = {
  data: {
    confirmation_number: string;
    first_name: string;
    last_name: string;
  };
};

export type PostResponseBody = {
  data: {
    added_checkin_times: {
      checkin_available_epoch: number;
      checkin_boot_epoch: number;
    }[];
    already_scheduled_checkin_times: {
      checkin_available_epoch: number;
      checkin_boot_epoch: number;
    }[];
  };
};

export type PostErrorResponseBody = {
  error: string;
};

/**
 * This pass-through keeps endpoint and authorizer token secret from the frontend
 */
export const post: RequestHandler<never, string, PostResponseBody | PostErrorResponseBody> = async (req) => {
  let responseBody: MaybePromise<void | EndpointOutput<PostResponseBody | PostErrorResponseBody>>;
  try {
    responseBody = await postInternal(req);
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

async function postInternal(req: ServerRequest<never, string>) {
  const requestBody = JSON.parse(req.body) as PostRequestBody;
  const externalRequestBody: ExternalRequestBody = {
    data: {
      confirmation_number: requestBody.data.confirmation_number,
      first_name: requestBody.data.first_name,
      last_name: requestBody.data.last_name
    }
  };
  const res = await fetch(`${process.env.HOST_URL}/v1/checkin-service/checkin`, {
    method: 'PUT',
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

  const responseBody = (await res.json()) as ExternalResponseBody;
  return {
    status: res.status,
    body: responseBody
  };
}

interface ExternalRequestBody {
  data: {
    confirmation_number: string;
    first_name: string;
    last_name: string;
  };
}

interface ExternalResponseBody {
  data: {
    added_checkin_times: {
      checkin_available_epoch: number;
      checkin_boot_epoch: number;
    }[];
    already_scheduled_checkin_times: {
      checkin_available_epoch: number;
      checkin_boot_epoch: number;
    }[];
  };
}
