import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository: UserRepository;
  private JWT_SECRET: string;
  private JWT_EXPIRATION: string;

  public constructor(
    userRepository: UserRepository,
    jwtSecret: string = process.env.JWT_SECRET || "",
    jwtExpiration: string = "1h",
  ) {
    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not defined. Set it in the environment variables.",
      );
    }
    this.userRepository = userRepository;
    this.JWT_SECRET = jwtSecret;
    this.JWT_EXPIRATION = jwtExpiration;
  }

  register = async (userData: {
    fullName: string;
    password: string;
    cpf: string;
    registration: string;
    email: string;
    community: {
      connect: {
        userId_communityId: { userId: number; communityId: number };
      }[];
    };
    roles: {
      connect: { userId_roleId: { userId: number; roleId: number } }[];
    };
    course: {
      connect: { courseId_userId: { userId: number; courseId: number } }[];
    };
    birthDate?: Date;
    phone?: string;
  }) => {
    if (!this.isPasswordStrong(userData.password)) {
      throw new Error(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.",
      );
    }

    await this.checkForDuplicates(
      userData.email,
      userData.cpf,
      userData.registration,
    );

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userCreateData = {
      fullName: userData.fullName,
      email: userData.email,
      cpf: userData.cpf,
      registration: userData.registration,
      password: hashedPassword,
      birthDate: userData.birthDate,
      phone: userData.phone,
      community:
        userData.community && userData.community.connect.length > 0
          ? userData.community
          : { connect: [] },
      roles:
        userData.roles && userData.roles.connect.length > 0
          ? userData.roles
          : { connect: [] },
      course:
        userData.course && userData.course.connect.length > 0
          ? userData.course
          : { connect: [] },
    };

    await this.userRepository.createUser(userCreateData);
  };

  login = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  };

  validateToken = async (token: string): Promise<number | null> => {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: number };
      return decoded.userId;
    } catch {
      return null;
    }
  };

  authenticateRoute = async (token: string) => {
    const userId = await this.validateToken(token);
    if (!userId) {
      throw new Error("Invalid token");
    }

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };

  private generateToken = (userId: number): string => {
    return jwt.sign({ userId }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRATION,
    });
  };

  private checkForDuplicates = async (
    email: string,
    cpf: string,
    registration: string,
  ) => {
    const existingUserByEmail =
      await this.userRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new Error("Email is already registered");
    }

    const existingUserByCPF = await this.userRepository.findUserByCPF(cpf);
    if (existingUserByCPF) {
      throw new Error("CPF is already registered");
    }

    const existingUserByRegistration =
      await this.userRepository.findUserByRegistration(registration);
    if (existingUserByRegistration) {
      throw new Error("Registration number is already registered");
    }
  };

  private formatRelationshipData = (data: any, relationshipKey: string) => {
    if (data[relationshipKey] && data[relationshipKey].connect) {
      return {
        connect: data[relationshipKey].connect
          .map((item: any) => ({
            [`${relationshipKey}Id_userId`]: {
              userId: item[`${relationshipKey}Id_userId`].userId,
              [`${relationshipKey}Id`]:
                item[`${relationshipKey}Id_userId`][`${relationshipKey}Id`],
            },
          }))
          .filter(
            (item: any) =>
              item[`${relationshipKey}Id_userId`].userId !== 0 &&
              item[`${relationshipKey}Id_userId`][`${relationshipKey}Id`] !== 0,
          ),
      };
    }
    return undefined;
  };

  private isPasswordStrong = (password: string): boolean => {
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };
}
