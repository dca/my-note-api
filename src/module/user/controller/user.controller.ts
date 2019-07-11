import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Req, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '../dto/create-user.dto';
import { CurrentUserResDto } from '../dto/current-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from '../user.service';

@ApiUseTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ title: 'Create User' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res): Promise<any> {
    const user = await this.userService.createUser(createUserDto);
    if (user) {
      user.password = '';
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ title: 'Get Current User' })
  @ApiResponse({ status: 200, type: CurrentUserResDto})
  @Get('me')
  @UseGuards(JwtAuthGuard())
  findOne(@Req() request): Promise<typeof CurrentUserResDto> {
    return request.user;
  }
}
