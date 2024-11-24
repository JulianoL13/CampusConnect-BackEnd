import { Router } from "express";
import { CommunityController } from "../../controllers/communityController/communityController";
import { CommunityService } from "../../services/communityService/communityService";
import { CommunityRepository } from "../../repositories/communityRepository/communityRepository";

const communityRepository = new CommunityRepository();
const communityService = new CommunityService(communityRepository);
const communityController = new CommunityController(communityService);

const router = Router();

// Rotas para gerenciar comunidades
router.get("/communities", (req, res) =>
  communityController.getCommunities(req, res),
);
router.get("/communities/:id", (req, res) =>
  communityController.getCommunityById(req, res),
);
router.post("/communities", (req, res) =>
  communityController.createCommunity(req, res),
);
router.put("/communities/:id", (req, res) =>
  communityController.updateCommunity(req, res),
);
router.delete("/communities/:id", (req, res) =>
  communityController.deleteCommunity(req, res),
);

router.post("/communityUser", (req, res) =>
  communityController.addUserToCommunity(req, res),
);

router.delete("/communityUser", (req, res) =>
  communityController.removeUserFromCommunity(req, res),
);

router.get("/community/user/:id", (req, res) =>
  communityController.findCommunityByUserId(req, res),
);

export default router;
