import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import {get_note} from "../../common/s3";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  return {
      statusCode: 200,
      body: await get_note("doesnotexist") ?? "nothing",
      // body: event.pathParameters?.id ?? "no id",
  };
};

interface Note {
    title: string;
    content: string;
}



async function apiHandlerFrom(callback: (arg: any) => any) {

    const result = await callback({});

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    }

}