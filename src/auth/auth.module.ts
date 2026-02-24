import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, JwtStrategy, RolesGuard],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
      secret: 'very secret key',
      signOptions: { expiresIn: '3000s' }
    })
  ],
  controllers: [AuthController],
  exports: [RolesGuard]
})
export class AuthModule { }
