import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
    pendiente = 'pendiente',
    en_progreso = 'en progreso',
    completada = 'completada'
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

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

}
