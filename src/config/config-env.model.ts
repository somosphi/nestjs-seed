import {
  IsString,
  IsUrl,
  IsNumber,
  IsPositive,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

export class ConfigEnv {
  @IsString()
  @IsEnum(NodeEnv)
  nodeEnv: string;

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

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }
}
