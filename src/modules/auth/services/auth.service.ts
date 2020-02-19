import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../../database/entities/user.entity';
import CryptoService from './crypto.service';
import UserService from '../../user/services/user.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
    const user = await this.userService.getUserWithCreds(email);
    const isPassCorrect = (
      user && await this.cryptoService.compare(pass, user.password)
    );

    return isPassCorrect ? user : null;
  }

  async login({ email, id }: User) {
    const payload = {
      id,
      email,
    };
    return {
      id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
