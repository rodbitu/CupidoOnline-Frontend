const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "cupido-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://zc46dq1xyd.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_JVkW8ZoYV",
      APP_CLIENT_ID: "2g2gi9i3jii4dk0l33g9er8h96",
      IDENTITY_POOL_ID: "us-east-1:809884b8-6598-4222-a9c3-c157e36827d3",
    },
  };
  
  export default config;