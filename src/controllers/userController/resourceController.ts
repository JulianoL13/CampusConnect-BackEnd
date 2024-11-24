import { ResourceService } from "../../services/userService/resourceService";
import { Request, Response } from "express";

export class ResourceController {
  private resourceService: ResourceService;
  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }
  createResource = async (req: Request, res: Response) => {
    try {
      const resource = await this.resourceService.createResource(req.body);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ message: "Error creating resource" });
    }
  };

  getResourceById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const resource = await this.resourceService.getResourceById(id);
      res.json(resource);
    } catch (error) {
      res.status(404).json({ message: "Resource not found" });
    }
  };

  getResources = async (req: Request, res: Response) => {
    try {
      const resources = await this.resourceService.getResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching resources" });
    }
  };

  deleteResource = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.resourceService.deleteResource(id);
      res.status(204).json({ message: "Resource deleted" });
    } catch (error) {
      res.status(404).json({ message: "Resource not found" });
    }
  };
}
