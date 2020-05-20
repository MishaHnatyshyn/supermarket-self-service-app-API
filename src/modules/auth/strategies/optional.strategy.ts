import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import UserService from '../../user/services/user.service';
import { UserJwtDto } from '../dto/user.jwt.dto';
import User from '../../database/entities/user/user.entity';

@Injectable()
export default class OptionalStrategy extends PassportStrategy(Strategy, 'optional') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate({ email, id }: UserJwtDto): Promise<User | { id: null }> {
    const user = await this.userService.getUser({ where: { email, id } });
    return user || { id: null };
  }
}
