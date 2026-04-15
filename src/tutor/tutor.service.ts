import { Injectable } from '@nestjs/common';
@Injectable()
export class TutorService {
  chat(data: any) { return 'Mensaje del tutor IA'; }
  getExplicacion(id: string) { return `Explicación IA del concepto ${id}`; }
  getSugerencia() { return 'Sugerencia de ejercicio de la IA'; }
}