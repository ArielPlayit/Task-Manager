import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Role } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // If no roles are required, allow access (authentication might still be needed via JwtAuthGuard)
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Check if the user object exists and has a role
    if (!user || !user.rol) {
        return false; // Or throw an UnauthorizedException if user should always exist here
    }

    // Check if the user's role is included in the required roles
    return requiredRoles.some((role) => user.rol === role);
  }
}