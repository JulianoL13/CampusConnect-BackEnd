import { Role } from "@prisma/client";
import { RoleRepository } from "../../repositories/userRepository/roleRepository";

export class RoleService {
  roleRepository: RoleRepository;
  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  createRole = async (data: {
    role: string;
    description?: string;
  }): Promise<Role> => {
    return this.roleRepository.createRole(data);
  };

  getRoles = async () => {
    return this.roleRepository.getRoles();
  };

  getRoleById = async (id: number) => {
    return this.roleRepository.getRoleById(id);
  };

  deleteRole = async (id: number) => {
    return this.roleRepository.deleteRole(id);
  };
}
