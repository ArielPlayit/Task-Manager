import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository:Repository<Task>,
  ){}

  async create(createTaskDto: CreateTaskDto, userId: UUID){
    const task = this.taskRepository.create({
      ...createTaskDto,
      user: { userId},
    });
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['user']
    });
  }

  async findByStatus(task_status: TaskStatus, userId: UUID): Promise<Task[]> {
    return await this.taskRepository.find({where: {task_status, user: { userId}}});
  }

  async findTaskById(id: UUID, userId: UUID): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: {id, user: { userId }}});
    if(!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  } 

  async update(id: UUID, updateTaskDto: UpdateTaskDto, user: any): Promise<Task>{
    const task = await this.findTaskById(id, user);
    Object.assign(task, updateTaskDto);
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: UUID, userId: UUID): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id, user: { userId } });
    if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.remove(task);
    return task;
}
}
