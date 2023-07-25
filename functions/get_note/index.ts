import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import {getNote} from "../../common/s3";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const result = await getNote("doesnotexist");
  return {
      statusCode: 200,
      body: JSON.stringify(result),
  };
};



async function apiHandlerFrom(callback: (arg: any) => any) {

    const result = await callback({});

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    }

}