import { Router } from "express";
import { AuthMiddleware } from "./middlewares/auth-middleware";
import { authenticationUserController } from "./use-cases/users/authentication";
import { createUSerController } from "./use-cases/users/create-user";

const routes = Router();

const authMiddleware = new AuthMiddleware();

routes.post("/users/authenticate", (request, response) =>
  authenticationUserController.handle(request, response)
);

routes.use(authMiddleware.auth);

routes.post("/users", (request, response) =>
  createUSerController.handle(request, response)
);

export { routes };
