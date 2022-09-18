import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StaticUSersRepository } from "../repositories/implementations/StaticUsersRepository";

type JwtPayloadProps = {
  id: string;
};

export class AuthMiddleware {
  async auth(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ message: "unauthorized" });
    }

    try {
      const token = authorization.replace("Bearer", "").trim();

      const { id } = jwt.verify(token, "somethingWeird") as JwtPayloadProps;

      const repository = StaticUSersRepository.getInstance();
      const user = await repository.findById(id);

      if (!user) {
        throw new Error("unauthorized");
      }

      request.user = { email: user.email };

      next();
    } catch (err) {
      return response
        .status(401)
        .json({ message: err.message || "unexpected error" });
    }
  }
}
