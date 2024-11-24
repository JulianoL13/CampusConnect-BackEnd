import { Router } from "express";
import { ProfileController } from "../../controllers/userController/profileController";
import { ProfileRepository } from "../../repositories/userRepository/profileRepository";
import { ProfileService } from "../../services/userService/profileService";
import { profile } from "console";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
const profileController = new ProfileController(profileService);

const router = Router();

router.post("/profile", (req, res) =>
  profileController.createProfile(req, res),
);
router.put("/profile/:id", (req, res) =>
  profileController.updateProfile(req, res),
);
router.get("/profile", (req, res) => profileController.getProfiles(req, res));
router.get("/profile/:id", (req, res) =>
  profileController.getProfileById(req, res),
);
router.delete("profile/:id", (req, res) =>
  profileController.deleteProfile(req, res),
);

export default router;
