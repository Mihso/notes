export default function handler(lambda) {
    return async function (event, context) {
      let body, statusCode;
      console.log(body)
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
        console.error(e);
        body = { error: e.message };
        statusCode = 500;
      }
  
      // Return HTTP response
      return {
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "https://localhost:5000",
          "Access-Control-Allow-Credentials": true,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
        credentials : "include",

      };
  }
}