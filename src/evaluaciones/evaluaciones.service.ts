import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Resultado } from './entities/resultado.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EvaluacionesService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
  ) {}

  // ─── EVALUACIONES ─────────────────────────────────────────────

  async create(dto: CreateEvaluacionDto, user: User): Promise<Evaluacion> {
    const evaluacion = this.evaluacionRepository.create({
      ...dto,
      creadoPorId: user.id,
    });
    return await this.evaluacionRepository.save(evaluacion);
  }

  async findAll(): Promise<Evaluacion[]> {
    return await this.evaluacionRepository.find({
      where: { isActive: true },
      // No exponemos respuestaCorrecta en el listado general
      select: ['id', 'titulo', 'descripcion', 'pregunta', 'opciones', 'puntaje', 'conceptoId', 'createdAt'],
    });
  }

  async findOne(id: number): Promise<Evaluacion> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id, isActive: true },
    });
    if (!evaluacion) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }
    return evaluacion;
  }

  async update(id: number, dto: UpdateEvaluacionDto): Promise<Evaluacion> {
    const evaluacion = await this.findOne(id);
    Object.assign(evaluacion, dto);
    return await this.evaluacionRepository.save(evaluacion);
  }

  async remove(id: number): Promise<{ message: string }> {
    const evaluacion = await this.findOne(id);
    evaluacion.isActive = false;
    await this.evaluacionRepository.save(evaluacion);
    return { message: `Evaluación "${evaluacion.titulo}" desactivada correctamente` };
  }

  // ─── RESULTADOS ──────────────────────────────────────────────

  async responder(dto: CreateResultadoDto, user: User): Promise<Resultado> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id: dto.evaluacionId, isActive: true },
    });
    if (!evaluacion) {
      throw new NotFoundException(`Evaluación con ID ${dto.evaluacionId} no encontrada`);
    }

    // Corrección automática: compara respuesta del usuario con la correcta
    const esCorrecta =
      dto.respuestaUsuario.trim().toLowerCase() ===
      evaluacion.respuestaCorrecta.trim().toLowerCase();

    const resultado = this.resultadoRepository.create({
      usuarioId: user.id,
      evaluacionId: dto.evaluacionId,
      respuestaUsuario: dto.respuestaUsuario,
      esCorrecta,
      puntajeObtenido: esCorrecta ? evaluacion.puntaje : 0,
    });

    return await this.resultadoRepository.save(resultado);
  }

  // El estudiante ve sus propios resultados
  async findMisResultados(user: User): Promise<Resultado[]> {
    return await this.resultadoRepository.find({
      where: { usuarioId: user.id },
      relations: ['evaluacion'],
      order: { respondidoEn: 'DESC' },
    });
  }

  // El docente/admin ve resultados de todos los usuarios
  async findTodosResultados(): Promise<Resultado[]> {
    return await this.resultadoRepository.find({
      relations: ['evaluacion', 'usuario'],
      order: { respondidoEn: 'DESC' },
    });
  }

  // Resultados por evaluacion específica (docente/admin)
  async findResultadosPorEvaluacion(evaluacionId: number): Promise<Resultado[]> {
    return await this.resultadoRepository.find({
      where: { evaluacionId },
      relations: ['usuario'],
      order: { respondidoEn: 'DESC' },
    });
  }
}