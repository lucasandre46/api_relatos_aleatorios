import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRelatoDto {
    @IsString()
    @IsNotEmpty()
    texto: string;

    @IsString()
    @IsNotEmpty()
    tema: string;

    @IsString()
    @IsNotEmpty()
    id_User: string;

}