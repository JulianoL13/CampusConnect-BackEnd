import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { DocumentsUtils } from "../../utils/documentsUtil";

export class UserService {
  private userRepository: UserRepository;
  private documentsUtils: DocumentsUtils;

  public constructor(
    userRepository: UserRepository,
    documentsUtils: DocumentsUtils,
  ) {
    this.documentsUtils = documentsUtils;
    this.userRepository = userRepository;
  }

  createUser = async (userData: {
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
  }): Promise<void> => {
    await this.userRepository.createUser(userData);
  };

  validateUserData = (userData: { cpf: string }): void => {
    const { cpf } = userData;
    if (!this.documentsUtils.isValidCPF(cpf)) {
      throw new Error("Invalid CPF provided.");
    }
  };

  updateUser = async (
    userId: number,
    userData: {
      fullName: string;
      password: string;
      cpf: string;
      registration: string;
      email: string;
      community: {
        connect: {
          userId: number;
          communityId: number;
        }[];
      };
      roles: {
        connect: {
          userId: number;
          roleId: number;
        }[];
      };
      course: {
        connect: {
          userId: number;
          courseId: number;
        }[];
      };
      birthDate?: Date;
      phone?: string;
    },
  ): Promise<User> => {
    this.validateUserData(userData);
    return await this.userRepository.updateUser(userId, userData);
  };

  getUsers = async (): Promise<User[]> => {
    return await this.userRepository.findUsers();
  };

  getUserById = async (userId: number): Promise<User | null> => {
    return await this.userRepository.findUserById(userId);
  };

  getUserByCpf = async (cpf: string): Promise<User | null> => {
    return await this.userRepository.findUserByCPF(cpf);
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.userRepository.findUserByEmail(email);
  };

  getUserByRegistration = async (
    registration: string,
  ): Promise<User | null> => {
    return await this.userRepository.findUserByRegistration(registration);
  };

  deleteUser = async (userId: number): Promise<User> => {
    return await this.userRepository.deleteUserAccount(userId);
  };
}
