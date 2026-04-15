import { IsNumber, IsOptional, IsBoolean, Max, Min } from 'class-validator';

export class UpdateProgresoDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  porcentaje?: number;

  @IsBoolean()
  @IsOptional()
  completado?: boolean;
}
