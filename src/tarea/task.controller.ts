import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './Task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'Task created succesfully' })
  @ApiResponse({ status: 400, description: 'Data validation error' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of all Tasks' })
  @ApiResponse({ status: 200, description: 'List of all Tasks' })
  @ApiResponse({ status: 404, description: 'No Logged Tasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Get('status/:task_status')
  @ApiOperation({ summary: 'List all Tasks by status' })
  @ApiResponse({ status: 200, description: 'List of Tasks by Status' })
  @ApiResponse({ status: 404, description: 'No Logged Tasks' })
  findByStatus(@Param('task_status') task_status: TaskStatus) {
    return this.taskService.findByStatus(task_status);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Task' })
  @ApiResponse({ status: 200, description: 'The Task has been successfully updated' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Task' })
  @ApiResponse({ status: 200, description: 'The Task has been successfully eliminated' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
