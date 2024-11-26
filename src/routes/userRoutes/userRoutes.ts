import { Router } from "express";
import { UserController } from "../../controllers/userController/userController";
import { UserService } from "../../services/userService/userService";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { DocumentsUtils } from "../../utils/documentsUtil";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const documentsUtil = new DocumentsUtils();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, documentsUtil);
const userController = new UserController(userService);
const authMiddleware = new AuthMiddleware();
const router = Router();

router.get(
  "/users",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    userController.getUsers(req, res),
);
router.get(
  "/users/cpf/:cpf",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    userController.getUserByCpf(req, res),
);
router.get(
  "/users/email/:email",
  /* authMiddleware.authenticateToken, */
  (req, res) => userController.getUserByEmail(req, res),
);
router.get(
  "/users/registration/:registration",
  /* authMiddleware.authenticateToken, */
  (req, res) => userController.getUserByRegistration(req, res),
);
router.get(
  "/users/:userId",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    userController.getUserById(req, res),
);
router.post("/users", authMiddleware.authenticateToken, (req, res) =>
  userController.createUser(req, res),
);
router.put("/users/:userId", authMiddleware.authenticateToken, (req, res) =>
  userController.updateUser(req, res),
);
router.delete("/users/:userId", authMiddleware.authenticateToken, (req, res) =>
  userController.deleteUser(req, res),
);

export default router;
