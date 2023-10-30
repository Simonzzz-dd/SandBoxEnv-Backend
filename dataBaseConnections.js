const mongoose = require("mongoose");

// Define connection strings for your different databases
const dbConnections = {
  apiRequestDB: mongoose.createConnection(process.env.apiRequestDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  apiResultDB: mongoose.createConnection(process.env.apiResultDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  apiResponseDB: mongoose.createConnection(process.env.apiResponseDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  userDb: mongoose.createConnection(process.env.user, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
};

module.exports = dbConnections;
