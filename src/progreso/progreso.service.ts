import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progreso } from './entities/progreso.entity';
import { CreateProgresoDto } from './dto/create-progreso.dto';
import { UpdateProgresoDto } from './dto/update-progreso.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProgresoService {
  constructor(
    @InjectRepository(Progreso)
    private readonly progresoRepository: Repository<Progreso>,
  ) {}

  async create(dto: CreateProgresoDto, user: User): Promise<Progreso> {
    // Verificar que no exista ya un progreso para ese concepto y usuario
    const existing = await this.progresoRepository.findOne({
      where: { usuarioId: user.id, conceptoId: dto.conceptoId },
    });
    if (existing) {
      throw new ConflictException('Ya existe un registro de progreso para este concepto');
    }

    const progreso = this.progresoRepository.create({
      usuarioId: user.id,
      conceptoId: dto.conceptoId,
      porcentaje: dto.porcentaje ?? 0,
      ultimaActividad: new Date(),
    });
    return await this.progresoRepository.save(progreso);
  }

  // El estudiante solo ve su propio progreso
  async findMiProgreso(user: User): Promise<Progreso[]> {
    return await this.progresoRepository.find({
      where: { usuarioId: user.id },
      relations: ['concepto'],
      order: { updatedAt: 'DESC' },
    });
  }

  // El docente/admin puede ver el progreso de cualquier usuario
  async findByUsuario(usuarioId: number): Promise<Progreso[]> {
    return await this.progresoRepository.find({
      where: { usuarioId },
      relations: ['concepto'],
      order: { updatedAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateProgresoDto, user: User): Promise<Progreso> {
    const progreso = await this.progresoRepository.findOne({
      where: { id, usuarioId: user.id },
    });
    if (!progreso) {
      throw new NotFoundException(`Registro de progreso con ID ${id} no encontrado`);
    }

    Object.assign(progreso, dto);
    progreso.ultimaActividad = new Date();

    // Si llega a 100%, automáticamente se marca como completado
    if (progreso.porcentaje >= 100) {
      progreso.completado = true;
      progreso.porcentaje = 100;
    }

    return await this.progresoRepository.save(progreso);
  }
}