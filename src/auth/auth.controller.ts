import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Registrar un nuevo usuario
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  /**
   * POST /auth/login
   * Iniciar sesión
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  /**
   * POST /auth/logout
   * Cerrar sesión (Manejado en front-end eliminando el token)
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return { message: 'Sesión cerrada exitosamente' };
  }

  /**
   * GET /auth/perfil
   * Obtener perfil del usuario autenticado usando el decorador personalizado
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getPerfil(@GetUser() user: User) {
    return {
      user,
    };
  }
}