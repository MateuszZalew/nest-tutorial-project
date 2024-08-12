import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  productId: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
