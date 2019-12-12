export class JsonplaceholderUser {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;

  constructor(data: Required<JsonplaceholderUser>) {
    Object.assign(this, {
      id: data.id,
      email: data.email,
      name: data.name,
      username: data.username,
    });
  }
}
