import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import Users from '../../database/entities/user.entity';
import AuthService from '../services/auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username, password): Promise<Partial<Users> | null> {
    return this.authService.validateUser(username, password);
  }
}
