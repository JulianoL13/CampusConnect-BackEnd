import prisma from "../../models/prisma";
import { Profile, User } from "@prisma/client";
import { UserRepository } from "./userRepository";

export class ProfileRepository {
  createProfile = async (data: {
    name: string;
    bio: string;
    userId: number;
    pic: string;
  }): Promise<Profile> => {
    return await prisma.profile.create({ data });
  };

  updateProfile = async (
    id: number,
    data: {
      name?: string;
      bio?: string;
      pic?: string;
    },
  ): Promise<Profile> => {
    return await prisma.profile.update({
      where: { id },
      data: {
        ...data,
      },
    });
  };

  getProfile = async (): Promise<Profile[]> => {
    return await prisma.profile.findMany();
  };

  getProfileById = async (id: number): Promise<Profile | null> => {
    return await prisma.profile.findUnique({ where: { id } });
  };

  deleteProfile = async (id: number): Promise<Profile> => {
    return await prisma.profile.delete({ where: { id } });
  };

  getProfileByUserId = async (userId: number): Promise<Profile | null> => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    return user?.profile || null;
  };
}
