import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/names')
  findAllNames() {
    return this.usersService.findAllNames();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Get()
  findBySearchParam(@Query('searchParam') searchParam: string) {
    return this.usersService.findBySearchParam(searchParam);
  }
}
