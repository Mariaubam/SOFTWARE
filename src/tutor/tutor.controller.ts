import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('tutor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('chat')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  chat(@Body() body: any) { return this.tutorService.chat(body); }

  @Get('explicacion/:conceptoId')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  getExplicacion(@Param('conceptoId') id: string) { return this.tutorService.getExplicacion(id); }

  @Get('sugerencia')
  @Roles(Role.ESTUDIANTE, Role.ADMIN)
  getSugerencia() { return this.tutorService.getSugerencia(); }
}
