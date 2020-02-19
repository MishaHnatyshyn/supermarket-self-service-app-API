import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import LocalStrategy from './strategies/local.strategy';
import UserStrategy from './strategies/user.strategy';
import AuthController from './auth.controller';
import UserModule from '../user';
import AuthService from './services/auth.service';
import CryptoService from './services/crypto.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserStrategy,
    CryptoService,
  ],
})
export class AuthModule {}
