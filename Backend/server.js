const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Route files
const workingSpace = require("./routes/workingSpace");
const reservation = require("./routes/reservation");
const user = require("./routes/user");
const auth = require("./routes/auth");
const reservationLog = require("./routes/log");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// ConnectMongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 10000,
});
app.use(limiter);

// Prevent http param pollutions
app.use(hpp());

// Enable CORS
const corsOptions = {
  origin: '*', // อนุญาติให้รับคำขอจากโดเมนนี้เท่านั้น
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาติให้ใช้เมทอดเหล่านี้
  allowedHeaders: ['Content-Type', 'Authorization','mode'], // อนุญาติให้ใช้ header เหล่านี้
  credentials: true // อนุญาติให้ใช้งาน credentials
};
app.use(cors(corsOptions));

// Cookie parser
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Co-Space API",
    },
    servers: [
      {
        url: "http://localhost:1200/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Mount routers
app.use("/api/v1/workingspace", workingSpace);
app.use("/api/v1/reservation", reservation);
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/log", reservationLog);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server is running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
