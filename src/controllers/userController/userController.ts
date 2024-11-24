import { Request, Response } from "express";
import { UserService } from "../../services/userService/userService";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      this.handleError(res, error, "Error creating user");
    }
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      this.handleError(res, error, "Error fetching users");
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await this.userService.getUserById(userId);

      if (user) {
        res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching user");
    }
  };

  getUserByCpf = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cpf } = req.params;
      const user = await this.userService.getUserByCpf(cpf);

      if (user) {
        res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching user by CPF");
    }
  };

  getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);

      if (user) {
        res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching user by email");
    }
  };

  getUserByRegistration = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { registration } = req.params;
      const user = await this.userService.getUserByRegistration(registration);

      if (user) {
        res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching user by registration");
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(userId, userData);

      if (updatedUser) {
        res.status(200).json({
          success: true,
          data: updatedUser,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error updating user");
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      await this.userService.deleteUser(userId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      this.handleError(res, error, "Error deleting user");
    }
  };

  private handleError = (
    res: Response,
    error: unknown,
    defaultMessage: string,
  ): void => {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: defaultMessage,
      });
    }
  };
}
