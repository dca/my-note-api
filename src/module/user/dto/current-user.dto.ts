import { IsString, ValidateIf, IsEmail, IsNumber, IsUUID } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CurrentUserResDto {

  @ApiModelProperty()
  @IsUUID()
  public id: string;

  @ApiModelPropertyOptional({ example: 'user@example.org' })
  @IsEmail()
  public email: string;

  @ApiModelPropertyOptional()
  @IsString()
  public nickname: string;

}
