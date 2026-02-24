import { Injectable } from '@nestjs/common';
import { CreateTicketCommentDto } from './dto/create-ticket_comment.dto';
import { UpdateTicketCommentDto } from './dto/update-ticket_comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketComment } from './entities/ticket_comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCommentsService {
  constructor(@InjectRepository(TicketComment) private readonly ticketcommentRepo:Repository<TicketComment>){}
  create(createTicketCommentDto: CreateTicketCommentDto) {
    return 'This action adds a new ticketComment';
  }

  findAll() {
    return `This action returns all ticketComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketComment`;
  }

  async update(id: number, updateTicketCommentDto: UpdateTicketCommentDto) {
    await this.ticketcommentRepo.update(id,updateTicketCommentDto);
    const updatedComment = await this.ticketcommentRepo.findOne({
    where: { id },
    relations: [
      'user','user.role'
    ],
  });
  return updatedComment
  }

  remove(id: number) {
    return this.ticketcommentRepo.delete(id);
  }
}
