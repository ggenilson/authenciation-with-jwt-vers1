import { StaticUSersRepository } from "../../../repositories/implementations/StaticUsersRepository";
import { CreateUSerController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

const staticUSersRepository = StaticUSersRepository.getInstance();

const createUserUseCase = new CreateUserUseCase(staticUSersRepository);

const createUSerController = new CreateUSerController(createUserUseCase);

export { createUSerController };
