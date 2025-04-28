import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiTaskOperation } from 'src/tarea/api-task-operation.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiTaskOperation({
    summary: 'Register a new user',
    responses: [
      { status: 201, description: 'User created successfully' },
      { status: 400, description: 'Data validation error' },
    ]
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiTaskOperation({
    summary: 'Login a user',
    responses: [
      { status: 200, description: 'User logged in successfully' },
      { status: 401, description: 'Invalid credentials' },
      { status: 400, description: 'Data validation error' },
    ]
  })
  loginUser(@Body()loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
