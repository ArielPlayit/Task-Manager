import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus} from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    task_name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    @ApiProperty({ enum: TaskStatus })
    task_status: TaskStatus;

}
