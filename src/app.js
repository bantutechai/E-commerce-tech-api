const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const env = require('./config/env');
const HTTP_STATUS = require('./constants/httpStatus');
const globalErrorHandler = require('./middlewares/error.middleware');

const app = express();

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. CORS Configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Body Parsing Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 4. Data Sanitization against NoSQL Injection
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

// 5. API Health Check Endpoint
app.get(`${env.API_PREFIX}/health`, (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'API is healthy and operational.',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 6. Handle 404 Undefined Routes
app.use('*', (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}`,
      timestamp: new Date().toISOString(),
    },
  });
});

// Registra APÓS a rota 404 e antes do module.exports:
app.use(globalErrorHandler);

module.exports = app;
