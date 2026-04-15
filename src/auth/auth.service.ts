import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registrar un nuevo usuario
   */
  async register(registerDto: RegisterDto) {
    try {
      console.log('Intentando registrar usuario:', registerDto.email);
      
      // Crear el usuario usando el servicio de usuarios
      const user = await this.userService.create(registerDto);

      // Generar el token JWT
      const token = await this.generateToken(user.id, user.email, user.role);

      console.log('Usuario registrado con éxito:', user.email);

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      console.error('Error en AuthService.register:', error.message);
      throw error; // Re-lanzar para que Nest lo maneje (ConflictException, etc.)
    }
  }

  /**
   * Login de usuario
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log('Intento de login para:', email);

    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user.isActive) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const token = await this.generateToken(user.id, user.email, user.role);
      console.log('Login exitoso para:', email);

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      console.error('Error en AuthService.login:', error.message);
      throw error;
    }
  }

  private async generateToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    return await this.jwtService.signAsync(payload);
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne(payload.sub);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}