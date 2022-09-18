import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail: (email: string) => Promise<User>;
  findById: (id: string) => Promise<User>;
  save: (user: User) => Promise<User>;
}
