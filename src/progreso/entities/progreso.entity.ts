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

@Entity('progreso')
export class Progreso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Concepto, { eager: false, nullable: false })
  @JoinColumn({ name: 'conceptoId' })
  concepto: Concepto;

  @Column()
  conceptoId: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  porcentaje: number; // 0.00 - 100.00

  @Column({ default: false })
  completado: boolean;

  @Column({ nullable: true })
  ultimaActividad: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
