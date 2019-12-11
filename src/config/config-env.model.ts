import { IsString, IsUrl, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class ConfigEnv {
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

  @IsString()
  @IsOptional()
  apmServiceName?: string;

  @IsString()
  @IsOptional()
  apmServiceUrl?: string;
}
