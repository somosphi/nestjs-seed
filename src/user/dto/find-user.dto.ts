import { IsNumberString } from 'class-validator';
import { PartialFilled } from 'src/shared/partial-filled.model';

export class FindUserDto extends PartialFilled<FindUserDto> {
  @IsNumberString()
  readonly id: string;
}
