import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ConceptosService } from './conceptos.service';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../user/entities/user.entity';

@Controller('conceptos')
@UseGuards(JwtAuthGuard, RolesGuard) // Todas las rutas requieren auth
export class ConceptosController {
  constructor(private readonly conceptosService: ConceptosService) {}

  /**
   * POST /conceptos
   * Solo admin y docente pueden crear conceptos
   */
  @Post()
  @Roles(Role.ADMIN, Role.DOCENTE)
  create(@Body() dto: CreateConceptoDto, @GetUser() user: User) {
    return this.conceptosService.create(dto, user);
  }

  /**
   * GET /conceptos
   * Todos los usuarios autenticados pueden ver conceptos
   */
  @Get()
  findAll() {
    return this.conceptosService.findAll();
  }

  /**
   * GET /conceptos/:id
   * Todos los usuarios autenticados pueden ver un concepto
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conceptosService.findOne(id);
  }

  /**
   * PATCH /conceptos/:id
   * Solo admin y docente pueden editar conceptos
   */
  @Patch(':id')
  @Roles(Role.ADMIN, Role.DOCENTE)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateConceptoDto) {
    return this.conceptosService.update(id, dto);
  }

  /**
   * DELETE /conceptos/:id
   * Solo admin puede eliminar (desactivar) conceptos
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conceptosService.remove(id);
  }
}
