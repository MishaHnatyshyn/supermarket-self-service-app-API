import {
  Controller, Request, Post, UseGuards, Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody, ApiOkResponse } from '@nestjs/swagger';
import AuthService from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import {AccessTokenDto} from './dto/access-token.dto';

@ApiUseTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: AccessTokenDto })
  @ApiImplicitBody({ name: 'LoginDto', type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req): AccessTokenDto {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({ type: AccessTokenDto })
  @ApiImplicitBody({ name: 'LoginDto', type: LoginDto })
  @Post('/signup')
  signup(@Body() data: LoginDto): Promise<AccessTokenDto> {
    return this.authService.signup(data);
  }
}
