import { IsNumberString } from 'class-validator';

export class FindUserDto {
  @IsNumberString()
  readonly id: string;
}
