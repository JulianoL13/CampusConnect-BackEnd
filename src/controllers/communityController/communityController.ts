import { CommunityService } from "../../services/communityService/communityService";
import { Request, Response } from "express";

export class CommunityController {
  communityService: CommunityService;

  constructor(communityService: CommunityService) {
    this.communityService = communityService;
  }

  createCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const community = await this.communityService.createCommunity(req.body);
      res.status(201).json(community);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  updateCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const community = await this.communityService.updateCommunity(
        parseInt(req.params.id, 10),
        req.body,
      );
      res.status(200).json(community);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getCommunities = async (req: Request, res: Response): Promise<void> => {
    try {
      const communities = await this.communityService.getCommunities();
      res.status(200).json(communities);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getCommunityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const community = await this.communityService.getCommunityById(
        parseInt(req.params.id, 10),
      );
      res.status(200).json(community);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  addUserToCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const userCommunity = await this.communityService.addUserToCommunity(
        req.body,
      );
      res.status(201).json(userCommunity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  removeUserFromCommunity = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await this.communityService.removeUserFromCommunity(req.body);
      res.sendStatus(204);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  findCommunityByUserId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const communities = await this.communityService.findCommunitiesByUserId(
        parseInt(req.params.id, 10),
      );
      res.status(200).json(communities);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  deleteCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.communityService.deleteCommunity(parseInt(req.params.id, 10));
      res.sendStatus(204);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };
}
