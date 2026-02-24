import { TicketComment } from 'src/ticket_comments/entities/ticket_comment.entity';
import { TicketStatusLog } from 'src/ticket_status_logs/entities/ticket_status_log.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Priority, TicketStatus } from '../enums/ticket.enums';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.MEDIUM,
  })
  priority: Priority;

  @ManyToOne(() => User, (user) => user.createdTickets, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => TicketComment, (comment) => comment.ticket)
  comments: TicketComment[];

  @OneToMany(() => TicketStatusLog, (log) => log.ticket)
  statusLogs: TicketStatusLog[];
}
