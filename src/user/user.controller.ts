import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Crear un nuevo usuario (Solo Admin)
   */
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * Obtener todos los usuarios (Solo Admin)
   */
  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * Obtener el perfil del usuario actual (Cualquier usuario autenticado)
   */
  @Get('me')
  getProfile(@GetUser() user: User) {
    return user;
  }

  /**
   * Actualizar el perfil del propio usuario
   */
  @Patch('me')
  async updateProfile(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(user.id, updateUserDto);
  }

  /**
   * Obtener un usuario por ID (Admin y Docente)
   */
  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCENTE)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  /**
   * Actualizar un usuario por ID (Solo Admin)
   */
  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  /**
   * Eliminar un usuario (Solo Admin)
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
