import { Ticket } from "src/tickets/entities/ticket.entity";
import { TicketStatus } from "src/tickets/enums/ticket.enums";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TicketStatusLog {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Ticket, ticket => ticket.statusLogs, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket

    @Column({
        type: 'enum',
        enum: TicketStatus
    })
    old_status: TicketStatus

    @Column({
        type: 'enum',
        enum: TicketStatus
    })
    new_status: TicketStatus

    @ManyToOne(() => User, user => user.statusLogs, { nullable: false })
    @JoinColumn({ name: 'changed_by' })
    changed_by: User

    @CreateDateColumn({ type: 'timestamp' })
    changed_at: Date
}
