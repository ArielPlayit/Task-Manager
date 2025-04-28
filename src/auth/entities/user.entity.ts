import { Task } from "src/tarea/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    User = 'User',
    Admin = 'ADMIN'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', { default: true })
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    }) rol: Role;


    @OneToMany(() =>Task, task => task.user, { cascade: true})
    task: Task[];

}
