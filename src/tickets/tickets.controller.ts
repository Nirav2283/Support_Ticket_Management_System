import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateTicketCommentDto } from 'src/ticket_comments/dto/create-ticket_comment.dto';
import { AnyARecord } from 'dns';
import { Role } from 'src/roles/entities/role.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'USER')
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: any) {
    const user = req.user;
    return this.ticketsService.create(createTicketDto, user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/comments')
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTicketCommentDto: CreateTicketCommentDto,
    @Req() req: any,
  ) {
    return this.ticketsService.addComment(id, createTicketCommentDto, req.user);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'USER', 'SUPPORT')
  @Get()
  findAll(@Req() req: any) {
    return this.ticketsService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/comments')
  getTicketComments(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.getTicketComments(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'SUPPORT')
  @Patch(':id/assign')
  assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.assign(id, updateTicketDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'SUPPORT')
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateStatus(id, updateTicketDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.remove(id);
  }
}
