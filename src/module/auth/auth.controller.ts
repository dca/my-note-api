import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/model/user.repository';

@ApiUseTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  @ApiOperation({ title: 'Login' })
  @Post('login')
  async login(@Body() createTokenDto: CreateTokenDto): Promise<any> {
    const user = await this.userRepository.checkPassword(createTokenDto);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return await this.authService.createToken(user);
  }
}
