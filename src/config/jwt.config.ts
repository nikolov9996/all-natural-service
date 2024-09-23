import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION, 10),
    },
  }),
);
