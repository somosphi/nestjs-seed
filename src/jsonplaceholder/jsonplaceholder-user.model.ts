import { PartialFilled } from 'src/shared/partial-filled.model';

export class JsonplaceholderUser extends PartialFilled<JsonplaceholderUser> {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
}
