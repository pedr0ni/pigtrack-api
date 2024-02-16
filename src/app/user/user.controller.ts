import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from './user.service';
import {LoginDto} from './dto/login.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}
