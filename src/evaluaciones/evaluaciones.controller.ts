import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete, ParseIntPipe } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../user/entities/user.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { CreateResultadoDto } from './dto/create-resultado.dto';

@Controller('evaluaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  /**
   * Obtener todas las evaluaciones activas
   * Cualquier usuario autenticado puede consultar
   */
  @Get()
  async findAll() {
    return await this.evaluacionesService.findAll();
  }

  /**
   * Obtener una evaluación por ID
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.evaluacionesService.findOne(id);
  }

  /**
   * Estudiante responde una evaluación
   */
  @Post('responder')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  async responder(@Body() dto: CreateResultadoDto, @GetUser() user: User) { 
    return await this.evaluacionesService.responder(dto, user); 
  }

  /**
   * Obtener historial de evaluaciones del estudiante
   */
  @Get('historial/mio')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  async getHistorialPropio(@GetUser() user: User) { 
    return await this.evaluacionesService.findMisResultados(user); 
  }

  /**
   * Crear nueva evaluación (Solo Admin y Docente)
   */
  @Post()
  @Roles(Role.ADMIN, Role.DOCENTE)
  async create(@Body() dto: CreateEvaluacionDto, @GetUser() user: User) { 
    return await this.evaluacionesService.create(dto, user); 
  }

  /**
   * Editar evaluación (Solo Admin y Docente)
   */
  @Patch(':id')
  @Roles(Role.ADMIN, Role.DOCENTE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEvaluacionDto) { 
    return await this.evaluacionesService.update(id, dto); 
  }

  /**
   * Ver todos los resultados (Reporte)
   * Solo admin y docente pueden acceder
   */
  @Get('reporte/todos')
  @Roles(Role.DOCENTE, Role.ADMIN)
  async getReporte() { 
    return await this.evaluacionesService.findTodosResultados(); 
  }

  /**
   * Eliminar (desactivar) evaluación (Solo Admin)
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.evaluacionesService.remove(id);
  }
}
