import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './Task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ApiTaskOperation } from './api-task-operation.decorator';
import { UUID } from 'crypto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/entities/user.entity';

@ApiTags('Task')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiTaskOperation({
    summary: 'Create a task',
    responses: [
      { status: 201, description: 'Task created succesfully' },
      { status: 400, description: 'Data validation error' },
      { status: 401, description: 'Unauthorized' },
    ],
  })
  async create(@Body() createTaskDto: CreateTaskDto, @User()user: any) {
    return await this.taskService.create(createTaskDto, user.userId);
  }

  @Get('status/:task_status')
  @ApiTaskOperation({
    summary: 'List all Tasks by status',
    responses: [
      { status: 200, description: 'List of Tasks by Status' },
      { status: 404, description: 'No Logged Tasks' },
      { status: 401, description: 'Unauthorized' },
    ],
  })
  async findByStatus(@Param('task_status') task_status: TaskStatus, @User() user: any) {
    return await this.taskService.findByStatus(task_status, user.userId);
  }

  @Get('all')
  @Roles(Role.Admin)
  @ApiTaskOperation({
    summary: 'Get all tasks (Admin only)',
    responses: [
      { status: 200, description: 'List of all tasks' }, 
      { status: 401, description: 'Unauthorized' },
      { status: 403, description: 'Forbidden' },
    ],
  })
  async findAllTasks() {
    return await this.taskService.findAll(); 
  }

  @Patch(':id')
  @ApiTaskOperation({
    summary: 'Update a Task',
    responses: [
      { status: 200, description: 'The Task has been successfully updated' },
      { status: 401, description: 'Unauthorized' },
    ],
  })
  async update(@Param('id') id: UUID, @Body() updateTaskDto: UpdateTaskDto, @User() user: any) {
    return await this.taskService.update(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  @ApiTaskOperation({
    summary: 'Delete a Task',
    responses: [
      { status: 200, description: 'The Task has been successfully eliminated' },
      { status: 401, description: 'Unauthorized' },
    ],
  })
  async remove(@Param('id') id: UUID, @User() user: any) {
    return await this.taskService.remove(id, user.userId);
  }
}
