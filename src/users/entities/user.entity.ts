import { Message } from 'src/messages/entities/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Message, message => message.user)
    messages: Message[]

    @OneToMany(type => Message, message => message.toUser)
    receivedMessage: Message[]
}
