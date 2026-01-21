import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [],
  providers: [Bcrypt], //A Classe Bcrypt foi registrada no array providers, pois se trata de uma Classe de Serviço.
  controllers: [],
  exports: [Bcrypt], //A Classe Bcrypt foi registrada no array exports, pois precisaremos utilizá-la no Módulo Usuario.
})
export class AuthModule {}
