const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectMongoDb } = require('./connect');
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const urlSpider=require("./routes/spider");
const app = express();
const port = 8002;

connectMongoDb('mongodb://localhost:27017/short-url')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/url",urlRoute);
app.use("/user", userRoute);
app.use("/crawl",urlSpider);

app.listen(port, () => console.log(`Server started at port ${port}`));
