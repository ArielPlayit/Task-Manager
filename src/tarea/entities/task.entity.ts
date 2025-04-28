import { UUID } from 'crypto';
import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
    pendiente = 'pendiente',
    en_progreso = 'en progreso',
    completada = 'completada'
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    task_name:string;

    @Column()
    description:string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.pendiente
    })
    task_status: TaskStatus;

    @ManyToOne(() => User, user => user.task,{onDelete: 'CASCADE', nullable: true})
    user: User;

}
