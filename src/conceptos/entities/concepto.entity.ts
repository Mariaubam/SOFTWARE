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

@Entity('conceptos')
export class Concepto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  contenido: string;

  @Column({ nullable: true })
  nivel: string; // 'basico' | 'intermedio' | 'avanzado'

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'creadoPorId' })
  creadoPor: User;

  @Column({ nullable: true })
  creadoPorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
