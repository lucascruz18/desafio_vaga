
# Back-End - Desafio Zeztra

Este é o back-end do sistema de conciliação de pagamentos, desenvolvido em **Node.js** com **TypeScript**. Ele gerencia o processamento de arquivos TXT contendo transações, realiza operações no banco de dados MongoDB e fornece uma API para integração com o front-end.

## 📋 Funcionalidades

- Receber e processar arquivos TXT contendo transações.
- Cadastrar clientes e transações no MongoDB.
- Evitar duplicação de transações já existentes.
- Calcular o tempo de execução do processamento dos arquivos.
- Listar transações com paginação e filtros .

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **MongoDB**

---

## ⚙️ Configuração e Execução

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)
- Gerenciador de pacotes **npm** ou **yarn**

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

MONGO_URI=<sua-string-de-conexão-com-mongodb>
PORT=5050

### Instalação

1. Clone este repositório:
git clone <url-do-repositorio>
cd <nome-do-repositorio>

2. Instale as dependências:
npm install

3. Compile o código TypeScript:
npm run build

4. Inicie o servidor em modo produção:
npm start

5. Para desenvolvimento, use:
npm run dev

---

## 🛠️ Scripts Disponíveis

Os scripts disponíveis no `package.json` incluem:

- `npm start`: Inicia o servidor em produção.
- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot reload.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm test`: Executa os testes automatizados.

---

## 📚 Endpoints da API

### **Cadastrar Cliente**
**POST** `/customers`

**Descrição:** Cadastra um cliente no banco de dados.

**Body:**
{
"name": "Nome do Cliente",
"cpfCnpj": "12345678901"
}

---

### **Upload de Arquivo TXT**
**POST** `/transaction/upload`

**Descrição:** Faz upload de um arquivo TXT contendo transações.

**Headers:**
- `Content-Type: multipart/form-data`

**Body:** Arquivo TXT no campo `file`.

---

### **Listar Transações**
**GET** `/transaction`

**Descrição:** Retorna uma lista paginada de transações.

**Query Params:**
- `page` (opcional): Número da página.
- `limit` (opcional): Quantidade de itens por página.
- `customer` (opcional): Nome do cliente.
- `cpfCnpj` (opcional): CPF ou CNPJ do cliente.
- `startDate` e `endDate` (opcional): Intervalo de datas da transação.

---
