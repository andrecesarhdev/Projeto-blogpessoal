import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn() // Cheve primaria gerada
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  descricao: string;

  //Realiconamento entre as tabelas postagem e tema
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
