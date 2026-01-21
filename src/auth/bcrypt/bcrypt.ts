//Nesta Classe vamos criar alguns Métodos, que utilizarão o pacote
//  Bcrypt para criptografar e validar a senha do usuário

// Importamos o pacote Common com os respectivos decoradores, que são utilizados na implementação da Classe Bcrypt.
import { Injectable } from '@nestjs/common';
//Importamos o pacote Bcrypt. Manualmente para garantir que possamos usar os métodos de criptografia fornecidos pela biblioteca.
import * as bcrypt from 'bcrypt';
//O decorador @Injectable é utilizado para marcar a classe como um Serviço, permitindo que ela seja injetada em outras classes através da Injeção de Dependências do NestJS.
@Injectable()
export class Bcrypt {
  //Criamos o método assíncrono criptografarSenha(senha: string), que retorna uma Promise contendo uma string, representando a senha criptografada.
  async criptografarSenha(senha: string): Promise<string> {
    //Definimos uma variável chamada saltos, que especifica o número de saltos (salts) que serão aplicados ao algoritmo Bcrypt. É basicamente o numero de vezes que a senha sera embaralhada(hash), nesse caso 10 vezes
    const saltos: number = 10;

    // O método hash(senha, saltos) da classe bcrypt é utilizado para criptografar a senha. Este método gera o hash da senha, aplicando os saltos e o algoritmo Bcrypt, garantindo que a senha seja armazenada de forma segura no banco de dados.
    return await bcrypt.hash(senha, saltos);
  }

  //Método Assíncrono (async), chamado compararSenhas(senhaDigitada: string, senhaBanco: string), que promete retornar uma Promise, que retornará um objeto boolean.
  async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    // Este Método retornará true se a senha digitada for igual a senha persistida no Banco de dados.
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}
