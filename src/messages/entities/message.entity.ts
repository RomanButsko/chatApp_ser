import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    title: string;

    @Column({default: ''})
    text: string;

    @Column()
    createdAt: Date;

    @ManyToOne(type => User, user => user.messages)
    user: User

    @ManyToOne(type => User, user => user.receivedMessage)
    toUser: User
}
