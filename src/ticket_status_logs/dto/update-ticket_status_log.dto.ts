import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketStatusLogDto } from './create-ticket_status_log.dto';

export class UpdateTicketStatusLogDto extends PartialType(CreateTicketStatusLogDto) {}
