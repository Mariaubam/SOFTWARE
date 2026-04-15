import { SetMetadata } from '@nestjs/common';
import { Role } from '../common/enums/role.enum';

/**
 * Decorador para especificar roles requeridos
 * Uso: @Roles(Role.ADMIN, Role.DOCENTE)
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);