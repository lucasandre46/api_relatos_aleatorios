import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCurtidaDto {
    @IsNotEmpty()
    @IsString()
    id_Relato: string;

    @IsString()
    @IsNotEmpty()
    id_User: string;

}