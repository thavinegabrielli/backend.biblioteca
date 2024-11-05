-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- ALUNO -- INSIRA 10 ALUNOS 
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Mariana', 'Silva', '2005-03-12', 'Avenida Brasil, 500', 'mariana.silva@gmail.com', '16992764523'),
('Lucas', 'Pereira', '1999-11-07', 'Rua das Flores, 120', 'lucas.pereira@hotmail.com', '16995431276'),
('Isabela', 'Souza', '2004-06-19', 'Travessa do Sol, 780', 'isabela.souza@yahoo.com', '16998342258'),
('Rafael', 'Gomes', '2001-09-25', 'Rua Verde, 305', 'rafael.gomes@outlook.com', '16991735584'),
('Carolina', 'Dias', '2002-10-11', 'Rua Azul, 88', 'carolina.dias@gmail.com', '16993753092'),
('Bruno', 'Almeida', '2003-04-15', 'Avenida Central, 654', 'bruno.almeida@empresa.com', '16994932677'),
('Ana', 'Oliveira', '2000-01-30', 'Rua da Paz, 101', 'ana.oliveira@empresa.com', '16992917543'),
('Paulo', 'Ferreira', '2002-12-05', 'Rua dos Anjos, 432', 'paulo.ferreira@hotmail.com', '16991739486'),
('Camila', 'Mendes', '2006-07-22', 'Avenida Nova, 221', 'camila.mendes@gmail.com', '16991853429'),
('Roberto', 'Lima', '2000-02-18', 'Rua Primavera, 115', 'roberto.lima@empresa.com', '16993941520');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- LIVRO -- INSIRA 10 LIVROS -- DADOS REAIS 
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', '1997', '978-8532530787', 15, 15, 70.00, 'Disponível'),
('Jogos Vorazes', 'Suzanne Collins', 'Rocco', '2008', '978-8579800245', 12, 12, 85.00, 'Disponível'),
('Divergente', 'Veronica Roth', 'Rocco', '2011', '978-8579801310', 10, 10, 60.00, 'Disponível'),
('A Culpa é das Estrelas', 'John Green', 'Intrínseca', '2012', '978-8580572261', 14, 14, 50.00, 'Disponível'),
('Maze Runner: Correr ou Morrer', 'James Dashner', 'Vergara & Riba', '2009', '978-8576832478', 8, 8, 65.00, 'Disponível'),
('Corte de Espinhos e Rosas', 'Sarah J. Maas', 'Galera Record', '2015', '978-8501106887', 10, 10, 75.00, 'Disponível'),
('Percy Jackson e o Ladrão de Raios', 'Rick Riordan', 'Intrínseca', '2005', '978-8598078397', 12, 12, 60.00, 'Disponível'),
('Os Seis Finalistas', 'Alexandra Monir', 'Jangada', '2018', '978-8555391094', 7, 7, 55.00, 'Disponível'),
('As Vantagens de Ser Invisível', 'Stephen Chbosky', 'Rocco', '1999', '978-8532522331', 6, 6, 45.00, 'Disponível'),
('Cidade dos Ossos', 'Cassandra Clare', 'Galera Record', '2007', '978-8501087148', 9, 9, 80.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- Inserindo Emprestimos -- 10 EMPRESTIMOS, não repetir em
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)  
VALUES 
(11, 20, '2024-10-01', '2024-10-15', 'Em andamento'),
(12, 19, '2024-10-02', '2024-10-16', 'Em andamento'),
(13, 17, '2024-10-03', '2024-10-17', 'Em andamento'),
(14, 12, '2024-10-04', '2024-10-18', 'Em andamento'),
(15, 16, '2024-10-05', '2024-10-19', 'Em andamento'),
(16, 13, '2024-10-06', '2024-10-20', 'Em andamento'),
(17, 14, '2024-10-07', '2024-10-21', 'Em andamento'),
(18, 11, '2024-10-08', '2024-10-22', 'Em andamento'),
(19, 18, '2024-10-09', '2024-10-23', 'Em andamento'),
(20, 15, '2024-10-10', '2024-10-24', 'Em andamento');

SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;