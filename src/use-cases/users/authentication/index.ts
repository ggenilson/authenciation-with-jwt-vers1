import { StaticUSersRepository } from "../../../repositories/implementations/StaticUsersRepository";
import { AuthenticationUserController } from "./authentication-user-controller";
import { AuthenticationUserUseCase } from "./authentication-user-use-case";

const staticUSersRepository = StaticUSersRepository.getInstance();

const createUserUseCase = new AuthenticationUserUseCase(staticUSersRepository);

const authenticationUserController = new AuthenticationUserController(
  createUserUseCase
);

export { authenticationUserController };
