import { Role } from "src/roles/entities/role.entity";
import { TicketComment } from "src/ticket_comments/entities/ticket_comment.entity";
import { TicketStatusLog } from "src/ticket_status_logs/entities/ticket_status_log.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email : string

    @Column()
    password : string //bcrypt

    @ManyToOne(()=>Role , role=>role.users)
    @JoinColumn({name:'role_id'})
    role:Role

    @CreateDateColumn({type:'timestamp'})
    created_at : Date

    @OneToMany(() => Ticket, (ticket) => ticket.created_by)
    createdTickets: Ticket[];

    @OneToMany(()=>Ticket , ticket=>ticket.assigned_to)
    assignedTickets:Ticket[]

    @OneToMany(()=>TicketComment, comment=>comment.user)
    comments:TicketComment[]

    @OneToMany(()=>TicketStatusLog , logs=>logs.changed_by)
    statusLogs : TicketStatusLog[]
}
