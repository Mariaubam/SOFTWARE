import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionesController } from './evaluaciones.controller';
import { EvaluacionesService } from './evaluaciones.service';
import { Evaluacion } from './entities/evaluacion.entity';
import { Resultado } from './entities/resultado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Resultado])],
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService],
  exports: [EvaluacionesService],
})
export class EvaluacionesModule {}
