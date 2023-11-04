# Introdução
Bibliotech é uma aplicação de gerenciamento de empréstimo de livros de usuarios da mesma cidade. 
O usuário pode: Criar uma conta, divulgar livros para emprestar ou alugar livros de outras pessoas.

# Instalação
No diretório bibliotech rode os seguintes comandos
- Insira suas credenciais do firebase no arquivo .env
- npm install - instala as dependências
- npx expo - roda a aplicação em modo de teste

# Firebase config
Dentro do Firebase database console, insira as seguintes regras

"livros_list": {
    ".indexOn": ["creationDate", "owner", "user", "pending", "uid"]
},
"usuarios": {
    ".indexOn": ["email"]
}
