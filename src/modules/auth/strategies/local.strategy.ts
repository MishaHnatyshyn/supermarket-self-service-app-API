import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import Users from '../../database/entities/user/user.entity';
import AuthService from '../services/auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  validate(email, password): Promise<Partial<Users> | null> {
    return this.authService.validateUser(email, password);
  }
}
