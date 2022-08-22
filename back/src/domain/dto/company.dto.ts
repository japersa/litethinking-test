import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  nit: string;
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}
