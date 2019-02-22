'use strict'
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});


exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({
        apiVersion: "2012-08-10"
    });

    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "us-east-1"
    });
    let responseBody = "";
    let statusCode = 0;

    const {id} = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: "12345"
        }
    }

    try {
        const data = await documentClient.get(params).promise();
        console.log(data);
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch (err) {
        console.log(err);
        responseBody = 'Unable to get user data';
        statusCode = 403;

    }

    const reponse = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }

    return reponse;


}