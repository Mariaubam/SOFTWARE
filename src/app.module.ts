import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConceptosModule } from './conceptos/conceptos.module';
import { ProgresoModule } from './progreso/progreso.module';
import { EvaluacionesModule } from './evaluaciones/evaluaciones.module';
import { TutorModule } from './tutor/tutor.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de TypeORM con MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Deshabilitado ahora que las tablas ya existen
      }),
      inject: [ConfigService],
    }),

    // Módulos de la aplicación
    UserModule,
    AuthModule,
    ConceptosModule,
    ProgresoModule,
    EvaluacionesModule,
    TutorModule,
    AdminModule,
  ],
})
export class AppModule {}
