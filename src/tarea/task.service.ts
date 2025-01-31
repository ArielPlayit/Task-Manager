import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository:Repository<Task>
  ){}

  async create(createTaskDto: CreateTaskDto){
    const task = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findByStatus(task_status: TaskStatus): Promise<Task[]> {
    return await this.taskRepository.find({where: {task_status}});
  }

  async findTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({where: {id}});
    if(!task){
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  } 

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>{
    const task = await this.findTaskById(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findTaskById(id);
    return this.taskRepository.remove(task);
  }
}
