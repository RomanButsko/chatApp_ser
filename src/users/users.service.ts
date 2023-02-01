import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({name: dto.name});
    if (user) return user;
    else {
     const newUser = this.userRepository.create(dto); 
     return this.userRepository.save(newUser)
    }
  }

  findAllNames() {
    return this.userRepository.find({
      select: ['name']
    })
  }

  findOne(name: string) {
    return this.userRepository.findOne({where: {name}});
  }

  findOneById(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  findBySearchParam(searchParam: string) {
    return this.userRepository.find({where: {name: Like(`%${searchParam}%`)}})
  }
}
