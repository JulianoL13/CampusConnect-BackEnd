import { Router } from "express";
import { RoleRepository } from "../../repositories/userRepository/roleRepository";
import { RoleService } from "../../services/userService/roleService";
import { RoleController } from "../../controllers/userController/roleController";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get("/role", authMiddleware.authenticateToken, (req, res) =>
  roleController.getAllRoles(req, res),
);
router.get("/role/:id", authMiddleware.authenticateToken, (req, res) =>
  roleController.getRoleById(req, res),
);
router.post("/role", authMiddleware.authenticateToken, (req, res) =>
  roleController.createRole(req, res),
);
router.delete("/role/:id", authMiddleware.authenticateToken, (req, res) =>
  roleController.deleteRole(req, res),
);

export default router;
