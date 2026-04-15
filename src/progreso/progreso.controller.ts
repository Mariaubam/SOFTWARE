import { Controller, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProgresoService } from './progreso.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../user/entities/user.entity';

@Controller('progreso')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgresoController {
  constructor(private readonly progresoService: ProgresoService) {}

  /**
   * Obtener mi propio progreso (Estudiante y Admin)
   */
  @Get('mio')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  async findMine(@GetUser() user: User) { 
    return await this.progresoService.findMiProgreso(user); 
  }

  /**
   * Obtener progreso de un estudiante específico (Docente y Admin)
   */
  @Get('estudiante/:id')
  @Roles(Role.DOCENTE, Role.ADMIN)
  async findByStudent(@Param('id', ParseIntPipe) id: number) { 
    return await this.progresoService.findByUsuario(id); 
  }
}
