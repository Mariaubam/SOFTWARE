import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Concepto } from '../../conceptos/entities/concepto.entity';

@Entity('evaluaciones')
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: false })
  pregunta: string;

  @Column({ type: 'json', nullable: true })
  opciones: string[]; // Opciones de respuesta (múltiple opción)

  @Column({ nullable: false })
  respuestaCorrecta: string;

  @Column({ default: 1 })
  puntaje: number;

  @ManyToOne(() => Concepto, { eager: false, nullable: true })
  @JoinColumn({ name: 'conceptoId' })
  concepto: Concepto;

  @Column({ nullable: true })
  conceptoId: number;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'creadoPorId' })
  creadoPor: User;

  @Column({ nullable: true })
  creadoPorId: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
