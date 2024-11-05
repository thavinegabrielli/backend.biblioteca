import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: string;
}

/**
 * A classe AlunoController estende a classe Aluno e é responsável por controlar as requisições relacionadas aos Alunos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Aluno".
 * - Herdando de Aluno, ela pode acessar métodos e propriedades da classe base.
 */
export class AlunoController extends Aluno {

    /**
    * Lista todos os carros.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Alunos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de alunos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os aluno e armazena o resultado
            const listaDeAluno = await Aluno.listagemAluno();

            // retorna a lista de aluno há quem fez a requisição web
            return res.status(200).json(listaDeAluno);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Aluno');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de aluno" });
        }
    }

    /**
    * Método controller para cadastrar um novo aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
    * e tenta cadastrar este aluno no banco de dados utilizando a função cadastroAluno. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno no formato AlunoDTO.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoAluno = new Aluno(alunoRecebido.nome, 
                                        alunoRecebido.sobrenome, 
                                        alunoRecebido.dataNascimento, 
                                        alunoRecebido.endereco, 
                                        alunoRecebido.email,
                                        alunoRecebido.celular);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o aluno. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}