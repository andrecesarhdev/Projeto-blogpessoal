import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario], //No array entities, vamos adicionar todas as Classes Entidades do módulo.
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule, //No array imports, vamos inserir o AuthModule
    UsuarioModule, //No array imports, vamos adicionar o UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
