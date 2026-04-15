import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Evaluacion } from '../../evaluaciones/entities/evaluacion.entity';

@Entity('resultados')
export class Resultado {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Evaluacion, { eager: true, nullable: false })
  @JoinColumn({ name: 'evaluacionId' })
  evaluacion: Evaluacion;

  @Column()
  evaluacionId: number;

  @Column({ nullable: false })
  respuestaUsuario: string;

  @Column({ default: false })
  esCorrecta: boolean;

  @Column({ default: 0 })
  puntajeObtenido: number;

  @CreateDateColumn()
  respondidoEn: Date;
}
