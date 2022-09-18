import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateUSerDTO } from "./create-user-dto";

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ICreateUSerDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    const user = new User(data);

    const userSaved = await this.userRepository.save(user);

    return userSaved;
  }
}
