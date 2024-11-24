import { Request, Response } from "express";
import { RoleService } from "../../services/userService/roleService";

export class RoleController {
  private roleService: RoleService;

  constructor(roleservice: RoleService) {
    this.roleService = roleservice;
  }

  getAllRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const roles = await this.roleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching roles" });
    }
  };

  getRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const role = await this.roleService.getRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: "Error fetching role" });
    }
  };

  createRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const role = req.body;
      const newRole = await this.roleService.createRole(role);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: "Error creating role" });
    }
  };

  deleteRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.roleService.deleteRole(id);
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting role" });
    }
  };
}
