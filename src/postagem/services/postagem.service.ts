import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { TemaService } from '../../tema/services/tema.service';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    //Essa prática implementa os princípios de inversão de controle
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
      },
    });
  }
  // get por id
  async findById(id: number): Promise<Postagem> {
    // procura no banco de dados pela postagem e guarda resultado na variavel
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
      },
    });
    // Se nao achou a postagem ali em cima da um erro de "Não encontrado " pro usuario.
    if (!postagem) {
      throw new HttpException(
        'A postagem nao foi encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    // Se achou a postagem la em cima, devolve ela pro usuario
    return postagem;
  }
  //retornará todos os Objetos da Classe Postagem persistidos no Banco de dados, cujo atributo titulo contenha a string enviada no parâmetro titulo do Método.
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);
    return await this.postagemRepository.save(postagem);
  }
  // Atuliaza uma postagem
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);
    await this.temaService.findById(postagem.tema.id);
    return await this.postagemRepository.save(postagem);
  }
  // Deleta uma postagem
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
