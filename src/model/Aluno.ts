import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;
/*
 Classe que representa um Aluno.
 */
export class Aluno {
    private idAluno: number = 0;
    private ra: string = '';
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;
  
    constructor( nome: string, sobrenome: string, dataNascimento: Date, endereco: string, email: string, celular: string) {
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.dataNascimento = dataNascimento;
      this.endereco = endereco;
      this.email = email;
      this.celular = celular;
    }
    
    public getIdAluno(): number {
      return this.idAluno;
    }
  
    public setIdAluno(idAluno: number): void {
      this.idAluno = idAluno;
    }

    public getRa(): string {
      return this.ra;
    }
  
    public setRa(ra: string): void {
      this.ra = ra;
    }
  
    public getNome(): string {
      return this.nome;
    }
  
    public setNome(nome: string): void {
      this.nome = nome;
    }
  
    public getSobrenome(): string {
      return this.sobrenome;
    }
  
    public setSobrenome(sobrenome: string): void {
      this.sobrenome = sobrenome;
    }
  
    public getDataNascimento(): Date {
      return this.dataNascimento;
    }
  
    public setDataNascimento(dataNascimento: Date): void {
      this.dataNascimento = dataNascimento;
    }
  
    public getEndereco(): string {
      return this.endereco;
    }
  
    public setEndereco(endereco: string): void {
      this.endereco = endereco;
    }
  
    public getEmail(): string {
      return this.email;
    }
  
    public setEmail(email: string): void {
      this.email = email;
    }
  
    public getCelular(): string {
      return this.celular;
    }
  
    public setCelular(celular: string): void {
      this.celular = celular;
    }
  


  /**
     * Busca e retorna uma lista de alunos do banco de dados.
     * @returns Um array de objetos do tipo aluno em caso de sucesso ou null se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "aluno".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe aluno.
     * - Cada aluno é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna null.
     */

  static async listagemAluno(): Promise<Array<Aluno> | null> {
    // objeto para armazenar a lista de alunos
    const listaDeAluno: Array<Aluno> = [];

    try {
        // query de consulta ao banco de dados
        const querySelectAluno = `SELECT * FROM aluno;`;

        // fazendo a consulta e guardando a resposta
        const respostaBD = await database.query(querySelectAluno);

        // usando a resposta para instanciar um objeto do tipo aluno
        respostaBD.rows.forEach((linha) => {
            // instancia (cria) objeto aluno
            const novoAluno = new Aluno(linha.nome,
                                        linha.sobrenome,
                                        linha.dataNascimento,
                                        linha.endereco,
                                        linha.email,
                                        linha.celular
              );

            // atribui o ID objeto
            novoAluno.setIdAluno(linha.id_aluno);

            // adiciona o objeto na lista
            listaDeAluno.push(novoAluno);
        });

        // retorna a lista de alunos
        return listaDeAluno;
    } catch (error) {
        console.log('Erro ao buscar lista de Aluno');
        return null;
    }


/**
 * Realiza o cadastro de um aluno no banco de dados.
 * 
 * Esta função recebe um objeto do tipo Aluno e insere seus dados nome, sobrenome, dataNascimento, endereco, email, celular)
 * na tabela aluno do banco de dados. O método retorna um valor booleano indicando se o cadastro 
 * foi realizado com sucesso.
 * 
 * @param {Aluno} aluno - Objeto contendo os dados do aluno que será cadastrado. O objeto Aluno
 *                        deve conter os métodos getMarca(), getModelo(), getAno() e getCor()
 *                        que retornam os respectivos valores do aluno.
 * @returns {Promise<boolean>} - Retorna true se o aluno foi cadastrado com sucesso e false caso contrário.
 *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
 * 
 * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
 *                   no console junto com os detalhes do erro.
 */
  }

static async cadastroAluno(aluno: Aluno): Promise<boolean> {
    try {
        // query para fazer insert de um aluno no banco de dados
        const queryInsertaluno = `INSERT INTO aluno (nome, sobrenome, datadenascimento, endereco, email, celular)
                                    VALUES
                                    ('${aluno.getNome()}', 
                                    '${aluno.getSobrenome()}', 
                                    '${aluno.getDataNascimento()}', 
                                    '${aluno.getEndereco()}',
                                    '${aluno.getEmail()}',
                                    '${aluno.getCelular()}')
                                    RETURNING id_aluno;`;

        // executa a query no banco e armazena a resposta
        const respostaBD = await database.query(queryInsertaluno);

        // verifica se a quantidade de linhas modificadas é diferente de 0
        if (respostaBD.rowCount != 0) {
            console.log(`aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
            // true significa que o cadastro foi feito
            return true;
        }
        // false significa que o cadastro NÃO foi feito.
        return false;

        // tratando o erro
    } catch (error) {
        // imprime outra mensagem junto com o erro
        console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
        // imprime o erro no console
        console.log(error);
        // retorno um valor falso
        return false;
    }
}
}