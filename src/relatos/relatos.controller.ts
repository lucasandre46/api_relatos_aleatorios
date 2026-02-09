import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RelatosService } from './relatos.service';
import { CreateRelatoDto } from './dto/create-relato.dto';
import { CreateCurtidaDto } from './dto/create-curtida.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';


@Controller('relatos')
export class RelatosController {
    constructor(private readonly relatosService: RelatosService) { }

    @Post()
    async create(@Body() createRelatoDto: CreateRelatoDto) {
        return this.relatosService.create(createRelatoDto);
    }

    @Get()
    async findAll() {
        return this.relatosService.findAll();
    }

    @Post('curtir/toggle')
    async toggleCurtida(@Body() curtidaDto: CreateCurtidaDto) {
        return this.relatosService.toggleCurtida(curtidaDto);
    }

    @Post('comentario')
    async comentar(@Body() comentarioDto: CreateComentarioDto) {
        return this.relatosService.comentar(comentarioDto);
    }

    @Get(':id/comentarios')
    async getComments(@Param('id') id_Relato: string) {
        return this.relatosService.getComments(id_Relato);
    }

}
