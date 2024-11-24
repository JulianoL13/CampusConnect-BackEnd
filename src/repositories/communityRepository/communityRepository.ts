import prisma from "../../models/prisma";
import { Community, UserCommunities } from "@prisma/client";

export class CommunityRepository {
  createCommunity = async (data: {
    name: string;
    description: string;
  }): Promise<Community> => {
    return await prisma.community.create({
      data,
    });
  };

  updateCommunity = async (
    id: number,
    data: {
      name?: string;
      description?: string;
    },
  ): Promise<Community> => {
    return await prisma.community.update({
      where: { id },
      data,
    });
  };

  getCommunities = async (): Promise<Community[]> => {
    return await prisma.community.findMany();
  };

  getCommunityById = async (id: number): Promise<Community | null> => {
    return await prisma.community.findUnique({ where: { id } });
  };

  deleteCommunity = async (id: number): Promise<void> => {
    await prisma.community.delete({ where: { id } });
  };

  addUserToCommunity = async (data: {
    userId: number;
    communityId: number;
  }): Promise<UserCommunities> => {
    return await prisma.userCommunities.create({ data });
  };

  removeUserFromCommunity = async (data: {
    userId: number;
    communityId: number;
  }): Promise<void> => {
    await prisma.userCommunities.delete({
      where: {
        userId_communityId: {
          userId: data.userId,
          communityId: data.communityId,
        },
      },
    });
  };

  findCommunitiesByUserId = async (
    userId: number,
  ): Promise<UserCommunities[]> => {
    return await prisma.userCommunities.findMany({
      where: {
        userId,
      },
      include: {
        community: true,
      },
    });
  };
}
