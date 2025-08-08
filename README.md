# 📦 Formulário de Cadastro de Fornecedores e Produtos

Este é um projeto de formulário interativo para cadastro de fornecedores, produtos e anexos.  
Foi desenvolvido como parte de um **desafio técnico da VFlows**, utilizando apenas tecnologias de front-end puras (**HTML5**, **CSS3**, **JavaScript ES6**, **Bootstrap** e **jQuery**).

O código foi escrito do zero com foco em:
- Manipulação dinâmica do DOM
- Validação de campos obrigatórios
- Armazenamento temporário no navegador com **SessionStorage**
- Integração com API externa (ViaCEP)

---

## 🚀 Tecnologias Utilizadas

- **HTML5** — Estrutura do formulário e organização semântica
- **CSS3** — Estilização customizada com variáveis CSS e responsividade
- **JavaScript (ES6)** — Lógica de validação, manipulação de DOM e armazenamento
- **Bootstrap** — Elementos e responsividade base
- **jQuery 3.5.1** — Manipulação simplificada de elementos e máscaras de campos
- **API ViaCEP** — Consulta de endereço automático pelo CEP
- **SessionStorage** — Armazenamento de produtos e anexos temporariamente

---

## 📋 Como Funciona

### 1. Cadastro de Fornecedor (`supplier.js`)
- Todos os campos obrigatórios são validados antes do envio.
- Validação extra para **telefone**, **e-mail** e **CNPJ**.
- Máscaras aplicadas com jQuery para:
  - Telefone (`+55 (00) 00000-0000`)
  - CEP (`00000-000`)
  - CNPJ (`00.000.000/0000-00`)

### 2. Consulta de Endereço (`cep.js`)
- Ao perder o foco no campo **CEP** (`blur`), o sistema faz requisição para **BrasilAPI**.
- Caso o CEP seja inválido ou incompleto, os campos de endereço são limpos e um alerta é exibido.
- Caso válido, preenche automaticamente **rua**, **bairro**, **município** e **estado**.

### 3. Cadastro de Produtos (`product.js`)
- Produtos são adicionados via modal dinâmico criado pelo JavaScript.
- Campos validados antes da inclusão:
  - Descrição
  - Unidade de medida
  - Quantidade (deve ser > 0)
  - Valor unitário (deve ser > 0)
- Cálculo automático do **valor total** (`quantidade × valor unitário`).
- Produtos são exibidos dinamicamente e armazenados no **SessionStorage**.
- Opção para **excluir produto** individualmente.

### 4. Anexos (`anexo.js`)
- Anexos adicionados via modal dinâmico com pré-visualização do nome do arquivo.
- Armazenamento do arquivo como **Blob** no **SessionStorage**.
- Opções:
  - **Visualizar** (download do arquivo)
  - **Excluir** (remove do SessionStorage)

### 5. Alertas (`alert.js`)
- Sistema de alertas customizados criado do zero com HTML dinâmico + CSS animado.
- Mensagens somem automaticamente após 5 segundos.

### 6. Geração do JSON (`save.js`)
- Ao clicar em **Salvar Fornecedor**:
  - Valida fornecedor, produtos e anexos.
  - Mostra modal de **carregamento** (“Gerando JSON, aguarde...”).
  - Gera um objeto JSON com **todos os dados** preenchidos.
  - Exibe o JSON no console do navegador.

---

## 📂 Estrutura de Pastas

```plaintext
📁 projeto/
 ├── 📂 assets/
 │    ├── 📂 css/
 │    │    └── style.css
 │    ├── 📂 img/
 │    │    ├── box-icon.png
 │    │    └── caixa-vazia.png
 │    └── 📂 js/
 │         ├── alert.js       # Sistema de alertas
 │         ├── anexo.js       # Controle de anexos
 │         ├── cep.js         # Busca de endereço via CEP
 │         ├── product.js     # Controle de produtos
 │         ├── save.js        # Geração do JSON final
 │         └── supplier.js    # Validação do fornecedor
 ├── index.html
 └── README.md
