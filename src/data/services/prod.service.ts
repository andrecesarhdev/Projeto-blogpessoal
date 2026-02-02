import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres', // coloca bd que vai ser usado em prod
      url: process.env.DATABASE_URL, // link de acesso ao banco de dados
      logging: false, // nao exibir os logs de db no terminal do render
      dropSchema: false, // nao deletar os dados na reinicialização
      ssl: {
        rejectUnauthorized: false, //nocessidade de chaves de segurança
      },
      synchronize: true, // sincronizar o codigo com bd
      autoLoadEntities: true, // reconhecer automaticamente todas as entidades
    };
  }
}
