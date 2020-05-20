import { Controller, Get, Param } from '@nestjs/common';
import {ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import IdDto from '../../../shared/dto/id.dto';
import UserService from '../services/user.service';
import UserDto from '../dto/user.dto';

@ApiUseTags('user')
@Controller('user')
export default class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  getUserDetails(@Param() { id }: IdDto): Promise<UserDto> {
    return this.userService.getUserDetails(id);
  }
}
