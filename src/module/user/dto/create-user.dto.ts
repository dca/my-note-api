import { IsString, ValidateIf, IsEmail, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiModelProperty({required: false, example: 'user@example.org'})
  @IsEmail()
  public email: string;

  @ApiModelProperty({required: false})
  @IsString()
  public nickname: string;

  @ApiModelProperty()
  @IsString()
  public password: string;

  @ApiModelProperty()
  @IsString()
  public 'password_confirm': string;

}
