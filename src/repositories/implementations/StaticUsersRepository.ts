import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class StaticUSersRepository implements IUsersRepository {
  private users: User[] = [
    {
      id: "725f9ae1-dc1d-45fb-9696-484b545d760d",
      email: "ggenilsonaraujoga@gmail.com",
      password: "$2b$10$N0vImpx/t6g8cHPsx/H0SekXlP.36j1TGBL6LE6Z5ozt7ppRIR/wy",
    },
  ];

  private static INSTANCE: StaticUSersRepository;

  public static getInstance(): StaticUSersRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new StaticUSersRepository();
    }

    return this.INSTANCE;
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  async findById(id: string): Promise<User> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  async save(user: User): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    this.users.push({ ...user, password: hashPassword });

    return user;
  }
}
