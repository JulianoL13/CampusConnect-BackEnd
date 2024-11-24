import { PrismaClient, Resource } from "@prisma/client";

export class ResourceRepository {
  private prisma = new PrismaClient();

  createResource = async (data: { resource: string }): Promise<Resource> => {
    return await this.prisma.resource.create({
      data: {
        ...data,
      },
    });
  };

  getResourceById = async (id: number): Promise<Resource | null> => {
    return await this.prisma.resource.findUnique({
      where: { id },
    });
  };

  getAllResources = async (): Promise<Resource[]> => {
    return await this.prisma.resource.findMany();
  };

  updateResource = async (
    id: number,
    resourceData: Partial<Omit<Resource, "id">>,
  ): Promise<Resource> => {
    return await this.prisma.resource.update({
      where: { id },
      data: resourceData,
    });
  };

  deleteResource = async (id: number): Promise<Resource> => {
    return await this.prisma.resource.delete({
      where: { id },
    });
  };
}
