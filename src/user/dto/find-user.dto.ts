import { IsNumberString } from 'class-validator';
import { AutoValidator } from 'src/shared/auto-validator.model';

export class FindUserDto extends AutoValidator<FindUserDto> {
  @IsNumberString()
  readonly id: string;
}
