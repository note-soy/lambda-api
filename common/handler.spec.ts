import {apiHandlerWithPathParamFrom} from "./handler";
import {APIGatewayEvent} from "aws-lambda";

function testGatewayEvent(props?: Partial<APIGatewayEvent>): APIGatewayEvent {
    return {
        body: "eyJ0ZXN0IjoiYm9keSJ9",
        resource: "/{proxy+}",
        path: "/path/to/resource",
        httpMethod: "POST",
        isBase64Encoded: true,
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        pathParameters: {},
        stageVariables: {},
        headers: {},
        multiValueHeaders: {},
        requestContext: {
            authorizer: {},
            accountId: "123456789012",
            resourceId: "123456",
            stage: "prod",
            requestId: "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
            requestTimeEpoch: 1428582896000,
            identity: {
                apiKey: "",
                apiKeyId: "",
                clientCert: {
                    clientCertPem: "",
                    serialNumber: "",
                    subjectDN: "",
                    issuerDN: "",
                    validity: { notAfter: "", notBefore: "" },
                },
                principalOrgId: "",
                cognitoIdentityPoolId: null,
                accountId: null,
                cognitoIdentityId: null,
                caller: null,
                accessKey: null,
                sourceIp: "127.0.0.1",
                cognitoAuthenticationType: null,
                cognitoAuthenticationProvider: null,
                userArn: null,
                userAgent: "Custom User Agent String",
                user: null
            },
            path: "/prod/path/to/resource",
            resourcePath: "/{proxy+}",
            httpMethod: "POST",
            apiId: "1234567890",
            protocol: "HTTP/1.1"
        },
        ...props
    };
}

describe('handler constructors', () => {

    it('constructs an api handler that uses a defined path param', async () => {

        const fn = (id: string) => {return id};

        const handler = apiHandlerWithPathParamFrom("id", fn);

        const result = await handler(testGatewayEvent({
            pathParameters: {
                id: "test-value",
            }
        }));

        expect(result.body).toEqual('"test-value"');


    });

});