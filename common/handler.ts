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

export function apiHandlerWithPathParamAndBody(
    paramKey: string,
    callback: (pathParam: string, body: any) => any
): (event: APIGatewayEvent) => Promise<APIGatewayProxyResult> {

    return async (event) => {

        console.log(`Event: ${JSON.stringify(event, null, 2)}`);
        const param = (event?.pathParameters) && event.pathParameters[paramKey];
        
        if (!param) {
            return {
                statusCode: 400,
                body: `Path parameter ${paramKey} is invalid`,
            };
        }

        let body;
        try {
            body = event.body ? JSON.parse(event.body) : {};
        } catch (error) {
            return {
                statusCode: 400,
                body: 'Invalid request body',
            };
        }

        try {
            const result = await callback(param, body);
            return {
                statusCode: 200,
                body: JSON.stringify(result || { success: true }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // For CORS support
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                }
            };
        } catch (error) {
            console.error('Error processing request:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Internal server error' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                }
            };
        }
    }
}