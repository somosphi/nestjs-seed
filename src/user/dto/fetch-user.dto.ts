import { IsNumberString } from 'class-validator';
import { PartialFilled } from 'src/shared/partial-filled.model';

export class FetchUserDto extends PartialFilled<FetchUserDto> {
  @IsNumberString()
  readonly externalId: string;
}
