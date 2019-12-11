import { IsNumberString } from 'class-validator';

export class FindUserDto {
  @IsNumberString()
  id: string;
}
