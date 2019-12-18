import { IsNumberString } from 'class-validator';
import { AutoValidator } from 'src/shared/auto-validator.model';

export class FetchUserDto extends AutoValidator<FetchUserDto> {
  @IsNumberString()
  readonly externalId: string;
}
