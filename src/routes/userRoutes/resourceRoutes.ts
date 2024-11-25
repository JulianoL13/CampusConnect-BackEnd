import { Router } from "express";
import { ResourceRepository } from "../../repositories/userRepository/resourceRepository";
import { ResourceService } from "../../services/userService/resourceService";
import { ResourceController } from "../../controllers/userController/resourceController";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const resourceRepository = new ResourceRepository();
const resourceService = new ResourceService(resourceRepository);
const resourceController = new ResourceController(resourceService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get("/resource", authMiddleware.authenticateToken, (req, res) =>
  resourceController.getResources(req, res),
);
router.get("/resource/:id", authMiddleware.authenticateToken, (req, res) =>
  resourceController.getResourceById(req, res),
);
router.post("/resource", authMiddleware.authenticateToken, (req, res) =>
  resourceController.createResource(req, res),
);
router.delete("/resource/:id", authMiddleware.authenticateToken, (req, res) =>
  resourceController.deleteResource(req, res),
);

export default router;
