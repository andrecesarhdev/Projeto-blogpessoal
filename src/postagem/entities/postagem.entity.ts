import { IsNotEmpty } from 'class-validator'; // Valida se o campo não está vazio
import {
  Column, // Define uma coluna no banco de dados
  Entity, // Marca a classe como uma entidade do TypeORM
  ManyToOne,
  PrimaryGeneratedColumn, // Define a coluna como chave primária gerada automaticamente
  UpdateDateColumn, // Atualiza automaticamente a data quando o registro é alterado
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_postagens' }) // Define o nome da tabela no banco de dados
export class Postagem {
  @ApiProperty()
  @PrimaryGeneratedColumn() // Chave primária gerada automaticamente
  id: number;

  @ApiProperty()
  @IsNotEmpty() // Valida que o campo não pode ser vazio
  @Column({ length: 100, nullable: false }) // Coluna do tipo string, máximo 100 caracteres, obrigatória
  titulo: string;

  @ApiProperty()
  @IsNotEmpty() // Valida que o campo não pode ser vazio
  @Column({ length: 1000, nullable: false }) // Coluna do tipo string, máximo 1000 caracteres, obrigatória
  texto: string;

  @ApiProperty()
  @UpdateDateColumn() // Coluna que armazena a data de atualização automática
  data: Date;

  // Relacionamento entre as tabelas postagem e tema
  @ApiProperty()
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;

  // Relacionamento entre as tabelas postagem e usuario
  @ApiProperty()
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
