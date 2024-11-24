import { Router } from "express";
import { UserController } from "../../controllers/userController/userController";
import { UserService } from "../../services/userService/userService";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { DocumentsUtils } from "../../utils/documentsUtil";

const documentsUtil = new DocumentsUtils();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, documentsUtil);
const userController = new UserController(userService);
const router = Router();

router.get("/users", (req, res) => userController.getUsers(req, res));
router.get("/users/cpf/:cpf", (req, res) =>
  userController.getUserByCpf(req, res),
);
router.get("/users/email/:email", (req, res) =>
  userController.getUserByEmail(req, res),
);
router.get("/users/registration/:registration", (req, res) =>
  userController.getUserByRegistration(req, res),
);
router.get("/users/:userId", (req, res) =>
  userController.getUserById(req, res),
);
router.post("/users", (req, res) => userController.createUser(req, res));
router.put("/users/:userId", (req, res) => userController.updateUser(req, res));
router.delete("/users/:userId", (req, res) =>
  userController.deleteUser(req, res),
);

export default router;
