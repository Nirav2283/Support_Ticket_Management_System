import { Module } from '@nestjs/common';
import { TicketCommentsService } from './ticket_comments.service';
import { TicketCommentsController } from './ticket_comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketComment } from './entities/ticket_comment.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TicketComment,Ticket,User])],
  controllers: [TicketCommentsController],
  providers: [TicketCommentsService],
})
export class TicketCommentsModule {}
