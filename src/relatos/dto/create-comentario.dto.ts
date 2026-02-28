import { IsEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateComentarioDto {
    @IsNotEmpty()
    @IsString()
    id_Relato: string;

    @IsString()
    @IsNotEmpty()
    id_User: string;

    @IsString()
    @IsNotEmpty()
    texto: string;

}