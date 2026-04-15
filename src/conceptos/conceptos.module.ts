import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceptosController } from './conceptos.controller';
import { ConceptosService } from './conceptos.service';
import { Concepto } from './entities/concepto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concepto])],
  controllers: [ConceptosController],
  providers: [ConceptosService],
  exports: [ConceptosService],
})
export class ConceptosModule {}
