import { Injectable } from '@nestjs/common';
@Injectable()
export class AdminService {
  getParametros() { return 'Parámetros del sistema'; }
  updateParametros(data: any) { return 'Parámetros actualizados'; }
}