const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
const server = http.createServer(app);
const mongoose = require("mongoose");
const { msgConstants } = require("./helpers/msg.constants");
const index_routes = require("./routes/index.routes");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", index_routes);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => console.log(msgConstants.mongoStarted));
server.listen(PORT, (err) => (!err ? console.log(msgConstants.nodeStarted, PORT) : console.log(msgConstants.nodeError, err.message)));
