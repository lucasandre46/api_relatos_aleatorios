import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRelatoDto } from './DTO/relatoDTO';
import { Relatos } from '@prisma/client';

@Injectable()
export class RelatosService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createRelatoDto: CreateRelatoDto): Promise<Relatos> {
        return this.prisma.relatos.create({
            data: {
                texto: createRelatoDto.texto,
                tema: createRelatoDto.tema,
                id_User: createRelatoDto.id_User,
            },
        });
    }

    async findAll() {
        return this.prisma.relatos.findMany({
            include: {
                user: {
                    select: { nome: true }
                },
                _count: {
                    select: {
                        curtidas: true,
                        comentarios: true
                    }
                }
            }
        });
    }
}
