import { CommunityRepository } from "../../repositories/communityRepository/communityRepository";
import { Community, UserCommunities } from "@prisma/client";

export class CommunityService {
  communityRepository: CommunityRepository;
  constructor(communityRepository: CommunityRepository) {
    this.communityRepository = communityRepository;
  }

  createCommunity = async (data: {
    name: string;
    description: string;
  }): Promise<Community> => {
    return await this.communityRepository.createCommunity(data);
  };

  updateCommunity = async (
    id: number,
    data: {
      name: string;
      description: string;
    },
  ): Promise<Community> => {
    return await this.communityRepository.updateCommunity(id, data);
  };

  getCommunities = async (): Promise<Community[]> => {
    return await this.communityRepository.getCommunities();
  };

  getCommunityById = async (id: number): Promise<Community | null> => {
    return await this.communityRepository.getCommunityById(id);
  };

  deleteCommunity = async (id: number): Promise<void> => {
    return await this.communityRepository.deleteCommunity(id);
  };

  addUserToCommunity = async (data: {
    userId: number;
    communityId: number;
  }): Promise<UserCommunities> => {
    return await this.communityRepository.addUserToCommunity(data);
  };

  removeUserFromCommunity = async (data: {
    userId: number;
    communityId: number;
  }): Promise<void> => {
    await this.communityRepository.removeUserFromCommunity(data);
  };

  findCommunitiesByUserId = async (
    userId: number,
  ): Promise<UserCommunities[]> => {
    return await this.communityRepository.findCommunitiesByUserId(userId);
  };
}
