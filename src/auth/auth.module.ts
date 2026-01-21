import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { Bcrypt } from './bcrypt/bcrypt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], //A Classe Bcrypt foi registrada no array providers, pois se trata de uma Classe de Serviço.
  exports: [Bcrypt], //A Classe Bcrypt foi registrada no array exports, pois precisaremos utilizá-la no Módulo Usuario.
})
export class AuthModule {}
