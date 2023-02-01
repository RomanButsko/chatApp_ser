import { IsDate, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsDate()
    createdAt?: string;
    
    userId: number;

    toUserId: number
}