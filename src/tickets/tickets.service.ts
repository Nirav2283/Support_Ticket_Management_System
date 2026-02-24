import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TicketComment } from 'src/ticket_comments/entities/ticket_comment.entity';
import { CreateTicketCommentDto } from 'src/ticket_comments/dto/create-ticket_comment.dto';

@Injectable()
export class TicketsService {
  constructor(@InjectRepository(Ticket) private readonly ticektRepo: Repository<Ticket>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(TicketComment) private readonly ticketCommentRepo: Repository<TicketComment>) { }

    async create(createTicketDto: CreateTicketDto, userId: number) {

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ticketData: any = {
      title: createTicketDto.title,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      created_by: user
    };

    const ticket = this.ticektRepo.create(ticketData);

    return await this.ticektRepo.save(ticket);
  }

  async addComment(ticketId:number,createTicketCommentDto:CreateTicketCommentDto ,user:any){
    const ticket = await this.ticektRepo.findOne({
    where: { id: ticketId },
  });

  if(!ticket){
    throw new NotFoundException('ticket not found')
  }

  const comment = this.ticketCommentRepo.create({
    comment:createTicketCommentDto.comment,
    ticket:{id:ticketId},
    user:{id:user.id}
  })

  await this.ticketCommentRepo.save(comment);

  return await this.ticketCommentRepo.findOne({
    where: { id: comment.id },
    relations: ['user', 'user.role'],
  });
  }

  //get ticket
  async findAll(user: any) {
    return await this.ticektRepo.find({
      where: user.role === 'MANAGER' ? {} : { created_by: { id: user.id } },
      relations: [

        'created_by',
        'assigned_to',
        'created_by.role',
        'assigned_to.role'
      ],
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        created_at: true,
        created_by: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          role: {
            id: true,
            name: true,
          },
        },

        assigned_to: {
          id: true,

          name: true,
          email: true,
          created_at: true,
          role: {
            id: true,
            name: true,
          },
        },
      },
    });
  }


  //getticketcomments
  async getTicketComments(ticketId:number){
    return await this.ticketCommentRepo.find({
      where:{ticket:{id:ticketId}},
      relations:['user','user.role'],
      
    })
  }

  async findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  async assign(id: number, updateTicketDto: UpdateTicketDto) {
    const assignedToId = updateTicketDto.assigned_to || updateTicketDto.userId;
    if (!assignedToId) {
      throw new NotFoundException('Assigne ID is not foubnd');
    }
    const result = await this.ticektRepo.update(
      { id },
      {
        assigned_to: { id: assignedToId } as any
      }
    );
   
    const updatedTicket = await this.ticektRepo.findOne({
    where: { id },
    relations: [
      'created_by',
      'created_by.role',
      'assigned_to',
      'assigned_to.role'
    ],
  });

   return updatedTicket;
  }

  async updateStatus(id: number, updateTicketDto: UpdateTicketDto) {
    const { status } = updateTicketDto;
    if (!status) {
      throw new NotFoundException('Status reuired');
    }
    const result = await this.ticektRepo.update(id, { status });
    if(result.affected==0){
      throw new NotFoundException('Not foind')
    }

    const updatedTicket = await this.ticektRepo.findOne({
    where: { id },
    relations: [
      'created_by',
      'created_by.role',
      'assigned_to',
      'assigned_to.role'
    ],
  });
  return updatedTicket
  }
  async remove(id: number) {
    return await this.ticektRepo.delete(id)
  }
}
