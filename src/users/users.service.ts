import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesRepo.findOne({
      where: { name: createUserDto.role },
    });
    if (!role) {
      throw new NotFoundException('not found');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: role,
    });

    const savedUser = await this.userRepo.save(user);

    const { password, ...result } = savedUser;

return result;
    
    
  }

  findAll() {
    return this.userRepo.find({
      relations:['role'],
      select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
      role: {
        id: true,
        name: true,
      },
    },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findbyEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async checkLogin(email: string, password: string) {
    const user = await this.findbyEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
