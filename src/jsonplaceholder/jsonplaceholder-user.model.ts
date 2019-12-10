export class JsonplaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;

  constructor(data: Required<JsonplaceholderUser>) {
    Object.assign(this, {
      id: data.id,
      email: data.email,
      name: data.name,
      username: data.username,
    });
  }
}
