const express = require("express");
const cors = require("cors");

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");

supertokens.init({
  framework: "express",
  supertokens: {
    // These are the connection details of the app you created on supertokens.com
    connectionURI:
      "https://dca552d1462111ecba169b72c9819ce6-us-east-1.aws.supertokens.io:3574",
    apiKey: "D3R=USplPoLoHaEuLPUAGq68meQ6K0",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "st-custom-ui-node",
    apiDomain: "https://supertokens-node-server-production.up.railway.app",
    websiteDomain: "https://supertokens-ui.vercel.app",
    apiBasePath: "/auth",
    websiteBasePath: "/index",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});

const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://supertokens-ui.vercel.app"],
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(errorHandler());
