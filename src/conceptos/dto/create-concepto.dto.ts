import { IsString, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class CreateConceptoDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  contenido?: string;

  @IsString()
  @IsOptional()
  @IsIn(['basico', 'intermedio', 'avanzado'], {
    message: 'El nivel debe ser: basico, intermedio o avanzado',
  })
  nivel?: string;
}
