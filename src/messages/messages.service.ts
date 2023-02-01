import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>, 
              @InjectRepository(User) private userRepository: Repository<User>){}

  async create(dto: CreateMessageDto) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    const toUser = await this.userRepository.findOne({ where: { id: dto.toUserId } });
    if (user && toUser) {
      const newMessage = this.messageRepository.create({
        ...dto,
        user,
        toUser,
        createdAt: new Date().toISOString()
      });
      return await this.messageRepository.save(newMessage);
    } else {
      throw new NotAcceptableException('Пользователя не существует');
    }
  }

  async userfindAllMessages(id: number) {
    const user = await this.userRepository.findOne({where: {id}})
    const messages = await this.messageRepository.find({where: {toUser: user}, order: {'createdAt': 'DESC'},relations: ['user']})
    return messages;
  }
}
