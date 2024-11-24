import { Resource } from "@prisma/client";
import { ResourceRepository } from "../../repositories/userRepository/resourceRepository";

export class ResourceService {
  private resourceRepository: ResourceRepository;
  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = new ResourceRepository();
  }

  createResource = async (data: { resource: string }): Promise<Resource> => {
    return await this.resourceRepository.createResource(data);
  };

  updateResource = async (
    id: number,
    data: { resource: string },
  ): Promise<Resource> => {
    return await this.resourceRepository.updateResource(id, data);
  };

  getResourceById = async (id: number) => {
    return await this.resourceRepository.getResourceById(id);
  };

  getResources = async () => {
    return await this.resourceRepository.getAllResources();
  };

  deleteResource = async (id: number) => {
    return await this.resourceRepository.deleteResource(id);
  };
}
