import {
  IsString,
  IsUrl,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class ConfigEnv {
  @IsString()
  @IsUrl()
  jsonplaceholderUrl: string;

  @IsNumber()
  @IsPositive()
  jsonplaceholderTimeout: number;

  @IsString()
  typeormHost: string;

  @IsNumber()
  @IsPositive()
  typeormPort: number;

  @IsString()
  typeormUsername: string;

  @IsString()
  typeormPassword: string;

  @IsString()
  typeormDatabase: string;

  @IsString()
  typeormConnection: 'mysql';

  @IsString()
  @IsOptional()
  apmServiceName?: string;

  @IsString()
  @IsOptional()
  apmServiceUrl?: string;
}
