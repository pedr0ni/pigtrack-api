import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from './user.service';
import {LoginDto} from './dto/login.dto';
import {JwtAuthGuard} from 'src/infra/auth/auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(':id/packets')
  @UseGuards(JwtAuthGuard)
  getPackets(@Param('id') id: string) {
    return this.userService.getPackets(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}
