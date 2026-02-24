import { Ticket } from "src/tickets/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TicketComment {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Ticket , ticket=>ticket.comments,{onDelete:'CASCADE'})
    @JoinColumn({name : 'ticket_id'})
    ticket:Ticket

    @ManyToOne(()=>User , user=>user.comments,{nullable:false})
    @JoinColumn({name : 'user_id'})
    user:User

    @Column()
    comment : string

    @CreateDateColumn({type:'timestamp'})
    created_at : Date


}
