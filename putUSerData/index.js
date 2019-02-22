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

    const {id,firstname,lastname} = event;
    const params = {
        TableName: "Users",
        Item: {
            id: id ,
            firstname : firstname,
            lastname : lastname     
        }
    }

    try{
        const data = await documentClient.put(params).promise();
        console.log(data);
        responseBody = JSON.stringify(data);
        statusCode = 201;
    }catch(err){
        console.log(err);
        responseBody = 'Unable to put user data';
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