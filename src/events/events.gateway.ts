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

@WebSocketGateway({
    cors: { origin: "*" },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('EventsGateway');

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
    handleComment(@MessageBody() data: CreateComentarioDto) {
        this.logger.log(`Novo comentário no Relato ${data.id_Relato}: ${data.texto}`);

        // O servidor retransmite para todos
        this.server.emit('new_comment', {
            ...data,
            createdAt: new Date().toISOString()
        });

        return { status: 'ok' };
    }
}