import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Concepto } from '../../conceptos/entities/concepto.entity';

export enum EstadoAprendizaje {
  NO_INICIADO = 'no_iniciado',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado',
  REPASO = 'repaso',
}

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Concepto, { eager: true, nullable: false })
  @JoinColumn({ name: 'conceptoId' })
  concepto: Concepto;

  @Column()
  conceptoId: number;

  @Column({
    type: 'enum',
    enum: EstadoAprendizaje,
    default: EstadoAprendizaje.NO_INICIADO,
  })
  estado: EstadoAprendizaje;

  @Column({ nullable: true })
  notas: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
