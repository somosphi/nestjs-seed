import { IsString, IsUrl, IsNumber, IsPositive } from 'class-validator';

export class EnvConfig {
  @IsString()
  @IsUrl()
  jsonplaceholderUrl: string;

  @IsNumber()
  @IsPositive()
  jsonplaceholderTimeout: number;

  @IsString()
  mysqlHost: string;

  @IsNumber()
  @IsPositive()
  mysqlPort: number;

  @IsString()
  mysqlUsername: string;

  @IsString()
  mysqlPassword: string;

  @IsString()
  mysqlDatabase: string;
}
