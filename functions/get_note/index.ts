import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import {get_note} from "../../common/s3";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  return {
      statusCode: 200,
      // body: await get_note("test.txt"),
      body: event.pathParameters?.id ?? "no id",
   };
};