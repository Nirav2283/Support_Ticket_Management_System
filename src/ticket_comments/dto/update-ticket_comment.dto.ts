import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketCommentDto } from './create-ticket_comment.dto';

export class UpdateTicketCommentDto extends PartialType(CreateTicketCommentDto) {}
