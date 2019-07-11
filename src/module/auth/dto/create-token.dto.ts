import { IsString, ValidateIf, IsEmail } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateTokenDto {

  @ApiModelPropertyOptional()
  @ValidateIf(o => !o.email)
  @IsString()
  readonly nickname?: string;

  @ApiModelPropertyOptional({example: () => Math.random() + 'user1@example.org'})
  @ValidateIf(o => !o.nickname)
  @IsEmail()
  readonly email?: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

}
