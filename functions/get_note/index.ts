import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import {getNote} from "../../common/s3";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const id = event?.pathParameters?.id;
  if (id) {
      const result = await getNote(id);
      return {
          statusCode: 200,
          body: JSON.stringify(result),
      };
  } else {
      return {
          statusCode: 400,
          body: "Bad Request",
      }
  }
};



async function apiHandlerFrom(callback: (arg: any) => any) {

    const result = await callback({});

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    }

}