import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateResultadoDto {
  @IsInt()
  @IsPositive({ message: 'El ID de la evaluación debe ser un número positivo' })
  evaluacionId: number;

  @IsString()
  @IsNotEmpty({ message: 'La respuesta no puede estar vacía' })
  respuestaUsuario: string;
}
