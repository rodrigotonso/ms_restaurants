import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'local',
    server: {
      port: process.env.PORT,
    },
    database: {
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      migrations: process.env.TYPEORM_MIGRATIONS,
    },
  };
});
