import { Router } from "express";
import { ResourceRepository } from "../../repositories/userRepository/resourceRepository";
import { ResourceService } from "../../services/userService/resourceService";
import { ResourceController } from "../../controllers/userController/resourceController";

const resourceRepository = new ResourceRepository();
const resourceService = new ResourceService(resourceRepository);
const resourceController = new ResourceController(resourceService);

const router = Router();

router.get("/resource", resourceController.getResources);
router.get("/resource/:id", resourceController.getResourceById);
router.post("/resource", resourceController.createResource);
router.delete("/resource/:id", resourceController.deleteResource);

export default router;
