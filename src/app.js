const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const env = require('./config/env');
const HTTP_STATUS = require('./constants/httpStatus');
const routes = require('./routes');
const globalErrorHandler = require('./middlewares/error.middleware');
const { globalRateLimiter } = require('./middlewares/rateLimit.middleware');

const app = express();

// 1. Security Headers
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5500',                  // Live Server local
  'http://127.0.0.1:5500',                 // Live Server IP
  'https://seu-frontend.vercel.app',        // Seu domínio no Vercel
  'https://seu-usuario.github.io'           // GitHub Pages
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origem (como aplicativos mobile, cURL ou Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS: Origem não permitida.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// 3. Body Parsing & Cookies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 4. Data Sanitization against NoSQL Injection
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

// 5. Global Rate Limiter
app.use(globalRateLimiter);

// 6. Health Check Endpoint
app.get(`${env.API_PREFIX}/health`, (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'API is healthy and operational.',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 7. Register Application Routes
app.use(env.API_PREFIX, routes);

// 8. Handle Undefined 404 Routes
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

// 9. Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
