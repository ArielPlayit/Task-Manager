import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const user = this.userRepository.create({
      ...userData,
      password: await bcrypt.hash(password,10)
    });
    return await this.userRepository.save(user)
    ;
  }

  async login( loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {email},
    })
    if(!user)
      throw new UnauthorizedException ( "User does not exist" );
  
    
    if(!await bcrypt.compare(password, user.password))
      throw new UnauthorizedException ( "Invalid credentials" )
    
    const payload = { sub: user.userId, email: user.email, username: user.fullName, rol: user.rol};
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user.userId,
        email: user.email,
        username: user.fullName,
        rol: user.rol
      }
    }
  }
}
