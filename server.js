require("dotenv").config();
const dbConnections = require("./dataBaseConnections");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const generalPostRequests = require("./routes/Request/generalRequests");
const bodyParser = require("body-parser");
const webhookRouter = require("./webhook/generalRouter");
var cors = require('cors');
const generalAppRouter = require("./general/generalAppRouter");

// express app
const app = express();

// middleware
app.use("/api/*", express.json());
app.use("/app/*", bodyParser.json())
app.use("/webhook/*", bodyParser.text({ type: "application/xml" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


var corsOptions = {
  origin: 'http://127.0.0.1:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
// routes
app.use("/api/simo", generalPostRequests);
app.use("/api/user",cors(), userRoutes);
app.use("/app", generalAppRouter)
app.use("/webhook", webhookRouter);





// Store promises for each connection
const connectionPromises = Object.values(dbConnections).map(
  (connection) =>
    new Promise((resolve, reject) => {
      connection.on("error", reject);
      connection.once("open", () => resolve(connection));
    })
);


// Wait for all connection promises to resolve
Promise.all(connectionPromises)
  .then(() => {
    console.log("All database connections established");

    // Now that all connections are established, you can start your server
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error establishing database connections:", error);
  });
