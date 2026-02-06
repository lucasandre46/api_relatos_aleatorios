import { Controller, Post, Body, Get } from '@nestjs/common';
import { RelatosService } from './relatos.service';
import { CreateRelatoDto } from './DTO/relatoDTO';

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
}
