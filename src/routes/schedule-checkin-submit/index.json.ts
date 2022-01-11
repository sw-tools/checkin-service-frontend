import HttpStatus from 'http-status';

/**
 * This pass-through keeps endpoint and authorizer token secret from the frontend
 */
export async function post(req: { body: string }) {
  const requestBody = JSON.parse(req.body);

  try {
    const res = await fetch(`${process.env.HOST_URL}/v1/checkin-service/checkin`, {
      method: 'PUT',
      headers: {
        token: process.env.AUTHORIZER_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          confirmation_number: requestBody.data.confirmation_number,
          first_name: requestBody.data.first_name,
          last_name: requestBody.data.last_name
        }
      })
    });
    const responseBody = await res.json();
    return {
      status: res.status,
      body: JSON.stringify(responseBody)
    };
  } catch (error) {
    console.error(error);
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
}
