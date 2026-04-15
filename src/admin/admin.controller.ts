import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('parametros')
  @Roles(Role.ADMIN)
  getParametros() { return this.adminService.getParametros(); }

  @Patch('parametros')
  @Roles(Role.ADMIN)
  updateParametros(@Body() body: any) { return this.adminService.updateParametros(body); }
}
