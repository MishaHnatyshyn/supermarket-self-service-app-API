import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import AuthService from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {ApiUseTags, ApiImplicitBody, ApiOkResponse} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {LoginResponseObject} from './response-objects/login-response-object';

@ApiUseTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseObject })
  @ApiImplicitBody({ name: 'LoginDto', type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({ type: LoginResponseObject })
  @ApiImplicitBody({ name: 'LoginDto', type: LoginDto })
  @Post('/signup')
  async signup(@Body() data: LoginDto) {
    return this.authService.signup(data);
  }
}
