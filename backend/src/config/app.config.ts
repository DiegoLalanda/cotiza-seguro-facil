import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const port = parseInt(process.env.PORT || '3000', 10);
  const emailPort = parseInt(process.env.EMAIL_PORT || '587', 10);
  const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST environment variable is not set');
  }
  if (!process.env.DB_USERNAME) {
    throw new Error('DB_USERNAME environment variable is not set');
  }

  if (process.env.DB_PASSWORD === undefined) {
    throw new Error('DB_PASSWORD environment variable is not set (can be empty string)');
  }
  if (!process.env.DB_DATABASE) {
    throw new Error('DB_DATABASE environment variable is not set');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT_EXPIRES_IN environment variable is not set');
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: isNaN(port) ? 3000 : port,
    dbHost: process.env.DB_HOST,
    dbPort: isNaN(dbPort) ? 5432 : dbPort,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'default_admin@example.com',
    emailHost: process.env.EMAIL_HOST,
    emailPort: isNaN(emailPort) ? 587 : emailPort,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailFrom: process.env.EMAIL_FROM || '"Tu Seguro Online" <noreply-dev@cotizasegurofacil.com>',
  };
});