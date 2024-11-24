import { Router } from "express";
import { RoleRepository } from "../../repositories/userRepository/roleRepository";
import { RoleService } from "../../services/userService/roleService";
import { RoleController } from "../../controllers/userController/roleController";

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = Router();

router.get("/role", roleController.getAllRoles);
router.get("/role/:id", roleController.getRoleById);
router.post("/role", roleController.createRole);
router.delete("/role/:id", roleController.deleteRole);

export default router;
