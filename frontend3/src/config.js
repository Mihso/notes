const config = {
    // Backend config
    s3: {
      REGION: process.env.REACT_APP_REGION,
    },
    apiGateway: {
      REGION: process.env.REACT_APP_REGION,
      URL: process.env.REACT_APP_API_URL,
    },
    cognito: {
      REGION: process.env.REACT_APP_REGION,
    },
  };
  
  export default config;