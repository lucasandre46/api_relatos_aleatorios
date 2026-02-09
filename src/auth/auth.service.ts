import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';
import { Users } from '@prisma/client';


@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        return this.prisma.users.create({
            data: {
                email: createUserDto.email,
                senha: createUserDto.senha,
                nome: createUserDto.nome,
                numero: createUserDto.telefone,
            },
        });
    }

    async login(loginUserDto: LoginUserDto): Promise<Users> {
        const user = await this.prisma.users.findUnique({
            where: { email: loginUserDto.email },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (user.senha !== (loginUserDto as any).senha) {
            throw new UnauthorizedException('Senha incorreta');
        }

        return user;
    }

}
