# Front-End - Desafio Zeztra

Este é o front-end do sistema de conciliação de pagamentos, desenvolvido com **Next.js** e **TypeScript**. Ele oferece uma interface web para upload de arquivos TXT contendo transações, listagem paginada e filtrada das transações, além de integração com a API back-end.

## 📋 Funcionalidades

- Tela de dashboard com botão para upload de arquivo TXT.
- Tabela com listagem de transações paginada e ordenada pela data da transação.
- Filtros de busca para listagem, incluindo por nome e intervalo de datas da transação.

## 🚀 Tecnologias Utilizadas

- **Next.js**
- **TypeScript**
- **React**
- **HeroUI**

---

## ⚙️ Configuração e Execução

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- Gerenciador de pacotes **npm** ou **yarn**

### Instalação

1. Clone este repositório:
git clone <url-do-repositorio>
cd <nome-do-repositorio>


2. Instale as dependências:
npm install


3. Configure o endereço da API no arquivo `services/http/api.ts`. Altere a URL base para apontar para a instância da API back-end:
const api = axios.create({
baseURL: 'http://localhost:3001', // Altere aqui para o endereço da sua API
});


4. Inicie o servidor em modo desenvolvimento:
npm run dev


5. Para produção, execute os seguintes comandos:
npm run build
npm start


---

## 🛠️ Scripts Disponíveis

Os scripts disponíveis no `package.json` incluem:

- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot reload.
- `npm run build`: Compila o código para produção.
- `npm start`: Inicia o servidor em produção.

---