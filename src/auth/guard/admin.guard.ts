import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth.gaurd';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class AdminGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, verify JWT token using parent guard
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    // Get the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user has Admin role
    if (!user || user.role !== UserRole.Admin) {
      throw new ForbiddenException('Access denied. Admin role required.');
    }

    return true;
  }
}
