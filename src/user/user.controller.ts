import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiTaskOperation } from "src/tarea/api-task-operation.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/auth/entities/user.entity";

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Get(':email')
    @Roles(Role.Admin)
    @ApiTaskOperation({
        summary: 'Get user profile',
        responses: [
            { status: 200, description: 'User profile retrieved successfully' },
            { status: 401, description: 'Unauthorized' },
            { status: 404, description: 'User not found' },
            { status: 500, description: 'Internal server error' },
        ]
    })
    getuserProfile(@Param('email') email: string) {
        return this.userService.findOne(email);
    }
}