import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreateComentarioDto } from '../relatos/dto/create-comentario.dto';
import { PrismaService } from '../prisma.service';

@WebSocketGateway({
    cors: { origin: "*" },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('EventsGateway');

    constructor(private readonly prisma: PrismaService) { }

    afterInit(server: Server) {
        this.logger.log('WebSocket para Comentários Inicializado');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Usuário conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Usuário desconectado: ${client.id}`);
    }

    @SubscribeMessage('send_comment')
    // Ajustado para usar o CreateComentarioDto que você criou
    async handleComment(@MessageBody() data: CreateComentarioDto) {
        this.logger.log(`Novo comentário no Relato ${data.id_Relato}: ${data.texto}`);

        try {
            // Salva o comentário no banco de dados e traz os dados do usuário (nome)
            const novoComentario = await this.prisma.comentarios.create({
                data: {
                    id_Relato: data.id_Relato,
                    id_User: data.id_User,
                    texto: data.texto,
                },
                include: {
                    user: { select: { nome: true } }
                }
            });

            // O servidor retransmite para todos os clientes escutando
            this.server.emit('new_comment', novoComentario);

            return { status: 'ok', data: novoComentario };
        } catch (error) {
            this.logger.error(`Erro ao salvar comentário: ${error.message}`);
            return { status: 'error', message: 'Erro ao salvar comentário' };
        }
    }
}