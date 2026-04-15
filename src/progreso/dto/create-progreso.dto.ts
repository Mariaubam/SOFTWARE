import {
  IsInt,
  IsPositive,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsBoolean,
} from 'class-validator';

export class CreateProgresoDto {
  @IsInt()
  @IsPositive({ message: 'El ID del concepto debe ser un número positivo' })
  conceptoId: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  porcentaje?: number;
}
