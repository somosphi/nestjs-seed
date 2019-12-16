import { FullFilled } from 'src/shared/full-filled.model';

export class JsonplaceholderUser extends FullFilled<JsonplaceholderUser> {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
}
