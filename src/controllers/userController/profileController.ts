import { Request, Response } from "express";
import { ProfileService } from "../../services/userService/profileService";

export class ProfileController {
  profileService: ProfileService;
  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  createProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profileData = req.body;
      await this.profileService.createProfile(profileData);
      res.status(201).json({
        success: true,
        message: "Profile created successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profileId = parseInt(req.params.id, 10);
      const profileData = req.body;
      const updatedProfile = await this.profileService.updateProfile(
        profileId,
        profileData,
      );
      if (updatedProfile) {
        res.status(200).json({
          success: true,
          data: updatedProfile,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
      const profiles = await this.profileService.getProfiles();
      res.status(200).json({
        success: true,
        data: profiles,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getProfileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const profileId = parseInt(req.params.id, 10);
      const profile = await this.profileService.getProfileById(profileId);

      if (profile) {
        res.status(200).json({
          success: true,
          data: profile,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  };

  deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profileId = parseInt(req.params.id, 10);
      const deletedProfile = await this.profileService.deleteProfile(profileId);
      if (!deletedProfile) {
        res.status(404).json({ message: "Profile not found" });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(404).json({ message: "An unknown error ocurred" });
      }
    }
  };
}
