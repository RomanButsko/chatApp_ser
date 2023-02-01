import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  @Get('/user/:id')
  userfindAllMessages(@Param('id') id: number) {
    return this.messagesService.userfindAllMessages(id);
  }
}
