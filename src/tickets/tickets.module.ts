import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketComment } from 'src/ticket_comments/entities/ticket_comment.entity';
import { TicketStatusLog } from 'src/ticket_status_logs/entities/ticket_status_log.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketStatusLog, User, TicketComment])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule { }
