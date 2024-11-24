import { Profile } from "@prisma/client";
import { ProfileRepository } from "../../repositories/userRepository/profileRepository";

export class ProfileService {
  profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  createProfile = async (data: {
    name: string;
    bio: string;
    userId: number;
    pic: string;
  }): Promise<Profile> => {
    return this.profileRepository.createProfile(data);
  };
  updateProfile = async (
    profileId: number,
    data: {
      name: string;
      bio: string;
      userId: number;
      pic: string;
    },
  ): Promise<Profile> => {
    return this.profileRepository.updateProfile(profileId, data);
  };

  getProfiles = async (): Promise<Profile[]> => {
    return this.profileRepository.getProfile();
  };

  getProfileById = async (profileId: number): Promise<Profile | null> => {
    return this.profileRepository.getProfileById(profileId);
  };

  deleteProfile = async (profileId: number): Promise<Profile> => {
    return this.profileRepository.deleteProfile(profileId);
  };
}
