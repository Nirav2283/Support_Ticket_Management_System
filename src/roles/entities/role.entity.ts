import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'enum',
        enum:['MANAGER','SUPPORT','USER'],
        unique:true
    })
    name:string

    @OneToMany(()=>User , user=>user.role)
    users:User[]

}
