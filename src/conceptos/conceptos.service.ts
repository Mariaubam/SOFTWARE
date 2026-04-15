import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concepto } from './entities/concepto.entity';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ConceptosService {
  constructor(
    @InjectRepository(Concepto)
    private readonly conceptoRepository: Repository<Concepto>,
  ) {}

  async create(dto: CreateConceptoDto, user: User): Promise<Concepto> {
    const concepto = this.conceptoRepository.create({
      ...dto,
      creadoPorId: user.id,
    });
    return await this.conceptoRepository.save(concepto);
  }

  async findAll(): Promise<Concepto[]> {
    return await this.conceptoRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Concepto> {
    const concepto = await this.conceptoRepository.findOne({
      where: { id, isActive: true },
    });
    if (!concepto) {
      throw new NotFoundException(`Concepto con ID ${id} no encontrado`);
    }
    return concepto;
  }

  async update(id: number, dto: UpdateConceptoDto): Promise<Concepto> {
    const concepto = await this.findOne(id);
    Object.assign(concepto, dto);
    return await this.conceptoRepository.save(concepto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const concepto = await this.findOne(id);
    // Soft delete: solo desactivamos en lugar de borrar
    concepto.isActive = false;
    await this.conceptoRepository.save(concepto);
    return { message: `Concepto "${concepto.titulo}" desactivado correctamente` };
  }
}