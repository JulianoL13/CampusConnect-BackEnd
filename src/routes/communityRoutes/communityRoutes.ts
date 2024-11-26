import { Router } from "express";
import { CommunityController } from "../../controllers/communityController/communityController";
import { CommunityService } from "../../services/communityService/communityService";
import { CommunityRepository } from "../../repositories/communityRepository/communityRepository";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const communityRepository = new CommunityRepository();
const communityService = new CommunityService(communityRepository);
const communityController = new CommunityController(communityService);
const authMiddleware = new AuthMiddleware();

const router = Router();

// Rotas para gerenciar comunidades
router.get(
  "/communities",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    communityController.getCommunities(req, res),
);
router.get(
  "/communities/:id",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    communityController.getCommunityById(req, res),
);
router.post("/communities", authMiddleware.authenticateToken, (req, res) =>
  communityController.createCommunity(req, res),
);
router.put("/communities/:id", authMiddleware.authenticateToken, (req, res) =>
  communityController.updateCommunity(req, res),
);
router.delete(
  "/communities/:id",
  authMiddleware.authenticateToken,
  (req, res) => communityController.deleteCommunity(req, res),
);

router.post("/communityUser", authMiddleware.authenticateToken, (req, res) =>
  communityController.addUserToCommunity(req, res),
);

router.delete("/communityUser", authMiddleware.authenticateToken, (req, res) =>
  communityController.removeUserFromCommunity(req, res),
);

router.get(
  "/community/user/:id",
  /* authMiddleware.authenticateToken, */
  (req, res) => communityController.findCommunityByUserId(req, res),
);

export default router;
