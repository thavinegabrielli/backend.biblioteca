import { Request, Response } from "express";
import { Livro } from "../model/Livro";

interface LivroDTO {
     titulo: string,
     autora: string,
     editora: string,
     anoPublicacao: string,
     isbn: string,
     quantTotal: number,
     quantDisponivel: number,
     valorAquisicao: number,
     statusLivroEmprestado: string  
}

/**
 * A classe LivroController estende a classe Livro e é responsável por controlar as requisições relacionadas aos livros.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "livro".
 * - Herdando de Livro, ela pode acessar métodos e propriedades da classe base.
 */
export class LivroController extends Livro {

    /**
    * Lista todos os livros.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de carros em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de carros.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os livros e armazena o resultado
            const listaDeLivros = await Livro.listagemLivro();

            // retorna a lista de carros há quem fez a requisição web
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de livros');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }
    
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const LivroRecebido: LivroDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoLivro = new Livro(LivroRecebido.titulo, 
                                        LivroRecebido.autora, 
                                        LivroRecebido.editora, 
                                        LivroRecebido.anoPublicacao,
                                        LivroRecebido.isbn,
                                        LivroRecebido.quantTotal,
                                        LivroRecebido.quantDisponivel,
                                        LivroRecebido.valorAquisicao,
                                        LivroRecebido.statusLivroEmprestado );

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Livro.cadastroLivro(novoLivro);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o livro. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}