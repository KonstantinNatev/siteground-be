import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @Min(0.01)
  currency: string;
}