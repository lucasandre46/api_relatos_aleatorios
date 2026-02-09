import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRelatoDto } from './DTO/relatoDTO';
import { Relatos, Curtidas, Comentarios } from '@prisma/client';
import { CreateCurtidaDto } from '../relatos/DTO/curtidaDto';
import { CreateComentarioDto } from '../relatos/DTO/comentarioDto';

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
                user: { select: { nome: true } },
                curtidas: { select: { id_User: true } },
                _count: {
                    select: { curtidas: true, comentarios: true }
                }
            },
            orderBy: { id: 'desc' }
        });
    }

    async comentar(comentarioDto: CreateComentarioDto): Promise<Comentarios> {
        return this.prisma.comentarios.create({
            data: {
                id_Relato: comentarioDto.id_Relato,
                id_User: comentarioDto.id_User,
                texto: comentarioDto.texto,
            }
        });
    }

    async getComments(id_Relato: string): Promise<Comentarios[]> {
        return this.prisma.comentarios.findMany({
            where: { id_Relato },
            include: {
                user: { select: { nome: true } }
            }
        });
    }

    async toggleCurtida(dto: CreateCurtidaDto): Promise<{ action: string }> {
        const curtidaExistente = await this.prisma.curtidas.findFirst({
            where: {
                id_Relato: dto.id_Relato,
                id_User: dto.id_User,
            },
        });

        if (curtidaExistente) {
            await this.prisma.curtidas.delete({
                where: { id: curtidaExistente.id },
            });
            return { action: 'unliked' };
        } else {
            await this.prisma.curtidas.create({
                data: {
                    id_Relato: dto.id_Relato,
                    id_User: dto.id_User,
                },
            });
            return { action: 'liked' };
        }
    }
}