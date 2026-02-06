import { Module } from '@nestjs/common';
import { RelatosController } from './relatos.controller';
import { RelatosService } from './relatos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RelatosController],
  providers: [RelatosService, PrismaService]
})
export class RelatosModule { }
