import HttpStatus from 'http-status';

/**
 * This pass-through keeps the actual endpoint secret
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
    return {
      status: res.status,
      body: res.body
    };
  } catch (error) {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
}
