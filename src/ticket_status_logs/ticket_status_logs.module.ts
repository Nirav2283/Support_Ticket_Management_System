import { Module } from '@nestjs/common';
import { TicketStatusLogsService } from './ticket_status_logs.service';
import { TicketStatusLogsController } from './ticket_status_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStatusLog } from './entities/ticket_status_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TicketStatusLog])],
  controllers: [TicketStatusLogsController],
  providers: [TicketStatusLogsService],
})
export class TicketStatusLogsModule {}
