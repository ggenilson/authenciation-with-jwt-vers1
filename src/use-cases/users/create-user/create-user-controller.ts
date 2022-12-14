import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUSerController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const user = await this.createUserUseCase.execute({ email, password });

      return response.status(201).send(user);
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message || "unexpected error" });
    }
  }
}
