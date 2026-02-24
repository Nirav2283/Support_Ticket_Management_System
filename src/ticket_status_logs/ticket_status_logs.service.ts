import { Injectable } from '@nestjs/common';
import { CreateTicketStatusLogDto } from './dto/create-ticket_status_log.dto';
import { UpdateTicketStatusLogDto } from './dto/update-ticket_status_log.dto';

@Injectable()
export class TicketStatusLogsService {
  create(createTicketStatusLogDto: CreateTicketStatusLogDto) {
    return 'This action adds a new ticketStatusLog';
  }

  findAll() {
    return `This action returns all ticketStatusLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketStatusLog`;
  }

  update(id: number, updateTicketStatusLogDto: UpdateTicketStatusLogDto) {
    return `This action updates a #${id} ticketStatusLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketStatusLog`;
  }
}
