//Classe bem simples, sem decoradores ou importações, porque ela não será

import { ApiProperty } from '@nestjs/swagger';

// utilizada para gerar uma nova tabela no Banco de dados.
export class UsuarioLogin {
  @ApiProperty()
  public usuario: string;
  @ApiProperty()
  public senha: string;
}
// DTO -> Data Transfer Object
