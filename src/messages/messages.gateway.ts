import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway(Number(process.env.SOCKET_PORT), {
    cors: true,
    namespace: 'mail',
})

export class ChatGateway {
    constructor(private messageService: MessagesService,
                private userService: UsersService) {}

    @WebSocketServer()
    server: Socket

    @SubscribeMessage('letters:get')
    async handleMessagesGet(@MessageBody() name: string) {
        const user = await this.userService.findOne(name)
        const letters = await this.messageService.userfindAllMessages(user.id);
        this.server.to(user.name).emit('letters:get', letters);
        return letters;
    }

    @SubscribeMessage('letters:create')
    async handleLetterCreate(@MessageBody() dto: CreateMessageDto) {
    const user = await this.userService.findOne(String(dto.toUserId))
    dto.toUserId = user.id;
    const newMessage = await this.messageService.create(dto);
    console.log('вернулсоь', newMessage)
    this.server.emit('letters:create', newMessage);
    await this.handleMessagesGet(user.name)
    }
}