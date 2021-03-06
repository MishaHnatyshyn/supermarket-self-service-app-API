import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import UserService from '../../user/services/user.service';
import { UserJwtDto } from '../dto/user.jwt.dto';
import User from '../../database/entities/user/user.entity';

@Injectable()
export default class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  validate({ email, id }: UserJwtDto): Promise<User> {
    return this.userService.getUser({ where: { email, id } });
  }
}
