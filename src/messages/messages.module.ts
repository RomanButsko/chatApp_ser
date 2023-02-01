import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { ChatGateway } from './messages.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Message]), UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService, ChatGateway],
  exports: [MessagesService]
})
export class MessagesModule {}
