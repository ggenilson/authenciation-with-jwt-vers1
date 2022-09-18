import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "./authentication-user-dto";

export class AuthenticationUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("email or password does not match");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new Error("email or password does not match");
    }

    const token = jwt.sign({ id: user.id }, "somethingWeird", {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        email: user.email,
      },
    };
  }
}
