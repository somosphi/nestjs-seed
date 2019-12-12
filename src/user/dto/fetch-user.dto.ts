import { IsNumberString } from 'class-validator';

export class FetchUserDto {
  @IsNumberString()
  readonly externalId: string;
}
