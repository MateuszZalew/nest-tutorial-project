import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  productId: string;
}
