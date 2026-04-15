import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsInt,
} from 'class-validator';

export class CreateEvaluacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty({ message: 'La pregunta es obligatoria' })
  pregunta: string;

  @IsArray()
  @IsOptional()
  opciones?: string[];

  @IsString()
  @IsNotEmpty({ message: 'La respuesta correcta es obligatoria' })
  respuestaCorrecta: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  puntaje?: number;

  @IsInt()
  @IsOptional()
  conceptoId?: number;
}
