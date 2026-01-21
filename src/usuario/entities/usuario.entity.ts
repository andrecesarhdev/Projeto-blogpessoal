import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsEmail() // o decorador @IsEmail(), que tem a função validar se foi enviado um endereço de e-mail.
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string;

  @MinLength(8) //o decorador @MinLength(8), que tem a função validar se a senha do usuario possui no mínimo 8 caracteres.
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  foto: string;

  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagem: Postagem[];
}
