import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

export class Aluno {

    private idAluno: number = 0;
    private ra: string = '';
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string; 

    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do Aluno
     * @param Sobrenome Sobrenome do Aluno
     * @param dataNascimento Data de nascimento do Aluno
     * @param endereco Endereço do Aluno
     * @param email Email do Aluno
     * @param celular Celular do Aluno
     */
    public constructor (_nome:string, _sobrenome:string, _dataNascimento: Date, _endereco:string, _email:string, _celular:string){
        this.nome           = _nome;
        this.sobrenome      = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco       = _endereco;
        this.email          = _email;
        this.celular        = _celular;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number{
        return this.idAluno;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idAluno : idAluno
     */
    public setIdAluno(_idAluno: number): void{
        this.idAluno = _idAluno;
    }

    /*
    /**
     * Retorna o ra do aluno
     * @returns ra: ra aluno
     */
    public getRA(): string {
        return this.ra;
    }

    /**
     * Atribui o parâmetro ao atributo ra
     * 
     * @param _ra : ra do aluno
     */
    public setRA(_ra: string): void{
        this.ra = _ra;
    }
    

    /**
     * Retorna o nome do aluno
     * @returns nome: nome aluno
     */
    public getNome() {  
        return this.nome;
    }

    /**
     * Atribui o parâmetro ao atributo nome
     * 
     * @param _nome : nome do aluno
     */
    public setNome(_nome: string){  
        this.nome = _nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns sobrenome: sobrenome aluno
     */
    public getSobrenome() {  
        return this.sobrenome;
    }

    /**
     * Atribui o parâmetro ao atributo sobrenome
     * 
     * @param _sobrenome : sobrenome do aluno
     */
    public setSobrenome(_sobrenome: string){  
        this.sobrenome = _sobrenome;
    }

    /**
     * Retorna a dataNascimento do aluno
     * @returns datanascimento: dataNascimento aluno
     */
    public getDataNascimento() {
        return this.dataNascimento;
    }

    /**
     * Atribui o parâmetro ao atributo dataNascimento
     * 
     * @param _dataNascimento : dataNascimento do aluno
     */
    public setDataNascimento(_dataNascimento: Date) {
        this.dataNascimento = _dataNascimento;
    }

     /**
     * Retorna o endereço do aluno
     * @returns endereco: endereco aluno
     */
    public getEndereco() {
        return this.endereco;
    }
    
    /**
     * Atribui o parâmetro ao atributo endereco
     * 
     * @param _endereco : endereco do aluno
     */
    public setEndereco(_endereco: string) {
        this.endereco = _endereco;
    }

    /**
     * Retorna o email do aluno
     * @returns email: email aluno
     */
    public getEmail() {
        return this.email;
    }

    /**
     * Retorna o celular do aluno
     * @returns celular: celular aluno
     */
    public getCelular() {
        return this.celular;
    }

    /**
     * Atribui o parâmetro ao atributo celular
     * 
     * @param _celular : celular do aluno
     */
    public setCelular(_celular: string) {
        this.celular = _celular;
    }

    static async listagemAlunos(): Promise<Array<Aluno> | null> {
        const listaDeAlunos: Array<Aluno> = [];

        try {
            const querySelectAluno = `SELECT * FROM  Aluno;`
            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((linha) => {
                const novoAluno = new Aluno(
                    linha.nome, // coluna banco de dados
                    linha.sobrenome,
                    linha.data_nascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );
               

                listaDeAlunos.push(novoAluno);
            });
            
            return listaDeAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de aluno');
            return null;
        }
    }
    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const queryInsertaluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
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
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
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