const app = require('./src/app');
const env = require('./src/config/env');
const { connectDatabase } = require('./src/config/database');

// Handle uncaught exceptions globally
process.on('uncaughtException', (error) => {
  console.error('[WARNING] UNCAUGHT EXCEPTION! Shutting down process...');
  console.error(error.name, error.message, error.stack);
  process.exit(1);
});

let server;

// Bootstrapping server and database connection
const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(env.PORT, () => {
      console.log(`[SUCCESS] Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      console.log(`[SUCCESS] API Base URL: http://localhost:${env.PORT}${env.API_PREFIX}`);
    });
  } catch (error) {
    console.error('[ERROR] Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('[WARNING] UNHANDLED REJECTION! Shutting down gracefully...');
  console.error(error.name, error.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle termination signals
const gracefulShutdown = (signal) => {
  console.log(`[WARNING] ${signal} received. Closing HTTP server...`);
  if (server) {
    server.close(() => {
      console.log('[WARNING] HTTP server closed successfully.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
