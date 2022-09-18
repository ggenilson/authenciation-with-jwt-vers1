import { Request, Response } from "express";
import { AuthenticationUserUseCase } from "./authentication-user-use-case";

export class AuthenticationUserController {
  constructor(private authenticationUserCase: AuthenticationUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const user = await this.authenticationUserCase.execute({
        email,
        password,
      });

      return response.status(201).send(user);
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message || "unexpected error" });
    }
  }
}
