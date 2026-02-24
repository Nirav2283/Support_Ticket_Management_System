import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketStatusLogsService } from './ticket_status_logs.service';
import { CreateTicketStatusLogDto } from './dto/create-ticket_status_log.dto';
import { UpdateTicketStatusLogDto } from './dto/update-ticket_status_log.dto';

@Controller('ticket-status-logs')
export class TicketStatusLogsController {
  constructor(private readonly ticketStatusLogsService: TicketStatusLogsService) {}

  @Post()
  create(@Body() createTicketStatusLogDto: CreateTicketStatusLogDto) {
    return this.ticketStatusLogsService.create(createTicketStatusLogDto);
  }

  @Get()
  findAll() {
    return this.ticketStatusLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketStatusLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketStatusLogDto: UpdateTicketStatusLogDto) {
    return this.ticketStatusLogsService.update(+id, updateTicketStatusLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketStatusLogsService.remove(+id);
  }
}
