import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  category: string[];

  @IsOptional()
  @IsArray()
  image: string[];

  @IsOptional()
  user?: User;
}
