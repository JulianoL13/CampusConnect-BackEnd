import { Router } from "express";
import { ProfileController } from "../../controllers/userController/profileController";
import { ProfileRepository } from "../../repositories/userRepository/profileRepository";
import { ProfileService } from "../../services/userService/profileService";
import { AuthMiddleware } from "../../middleware/authMiddleware";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
const profileController = new ProfileController(profileService);
const authMiddleware = new AuthMiddleware();

const router = Router();

router.post("/profile", (req, res) =>
  profileController.createProfile(req, res),
);
router.put("/profile/:id", authMiddleware.authenticateToken, (req, res) =>
  profileController.updateProfile(req, res),
);
router.get(
  "/profile",
  /* authMiddleware.authenticateToken,  */ (req, res) =>
    profileController.getProfiles(req, res),
);
router.get(
  "/profile/:id",
  /* authMiddleware.authenticateToken, */ (req, res) =>
    profileController.getProfileById(req, res),
);
router.delete("profile/:id", authMiddleware.authenticateToken, (req, res) =>
  profileController.deleteProfile(req, res),
);

export default router;
