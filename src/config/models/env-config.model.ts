import { IsString, IsUrl, IsNumber, IsPositive } from 'class-validator';

export class EnvConfig {
  @IsString()
  @IsUrl()
  jsonplaceholderUrl: string;

  @IsNumber()
  @IsPositive()
  jsonplaceholderTimeout: number;
}
