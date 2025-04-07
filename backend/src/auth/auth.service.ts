/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { compare, encrypt } from 'src/libs/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async login(login: string, password: string) {
    try {
      // buscar el usuario por login
      const user = await this.prismaService.users.findUnique({
        where: {
          login,
        },
      });

      if (!user) {
        throw new BadRequestException('Email o contraseña incorrectos');
      }

      const isPasswordMatch = await compare(password, user.password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Email o contraseña incorrectos');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;

      const payload = {
        ...userWithoutPassword,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }

  async getUsers() {
    return await this.prismaService.users.findMany();
  }

  async signup(login: string, password: string) {
    try {
      const userFound = await this.prismaService.users.findUnique({
        where: {
          login,
        },
      });

      if (userFound) throw new BadRequestException('El Usuario ya existe');

      const hashedPassword = await encrypt(password);

      const user = await this.prismaService.users.create({
        data: {
          login,
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;

      const payload = {
        ...userWithoutPassword,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new Error('Error al crear el usuario');
    }
  }
}
