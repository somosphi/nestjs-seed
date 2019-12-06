import { User } from '../model/user.model';

export interface UserServiceContract {
  list(): Promise<User[]>;
  findById(id: number): Promise<User>;
  fetch(): Promise<void>;
}
