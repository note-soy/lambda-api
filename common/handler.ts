import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";

export function apiHandlerWithPathParamFrom(
    paramKey: string,
    callback: (pathParam: string) => any
): (event: APIGatewayEvent) => Promise<APIGatewayProxyResult> {

    return async (event) => {

        console.log(`Event: ${JSON.stringify(event, null, 2)}`);
        const param = (event?.pathParameters) && event.pathParameters[paramKey];
        if (param) {
            const result = await callback(param);
            return {
                statusCode: 200,
                body: JSON.stringify(result),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }

        return {
            statusCode: 400,
            body: `Path parameter ${paramKey} is invalid`,
        };

    }

}