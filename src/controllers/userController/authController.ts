import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/userService/authService";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { ProfileRepository } from "../../repositories/userRepository/profileRepository";

type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

export class AuthController {
  private authService: AuthService;

  constructor(userRepository?: UserRepository) {
    const userRepo = userRepository || new UserRepository();
    const profileRepo = new ProfileRepository();
    this.authService = new AuthService(userRepo, profileRepo);
  }

  public register: ExpressHandler = async (req, res) => {
    try {
      const userData = req.body;

      await this.authService.register(userData);

      return res.status(201).json({
        message: "User successfully registered",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Error registering user",
      });
    }
  };

  public login: ExpressHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login({ email, password });

      return res.status(200).json({
        message: "Successfully logged in",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Error logging in",
      });
    }
  };

  public protectedRoute: ExpressHandler = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
      }

      const token = authHeader.split(" ")[1];
      const user = await this.authService.authenticateRoute(token);

      (req as any).user = user;

      return res.status(200).json({
        message: "Protected route accessed",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        error: error instanceof Error ? error.message : "Denied",
      });
    }
  };

  public authMiddleware: ExpressHandler = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
      }

      const token = authHeader.split(" ")[1];
      const user = await this.authService.authenticateRoute(token);

      (req as any).user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        error: error instanceof Error ? error.message : "Denied",
      });
    }
  };
}
