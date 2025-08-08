// Seleciona os elementos do DOM
const modal = document.querySelector('#modal'); // Modal para adicionar produtos
const addProduct = document.querySelector("#add-product"); // Botão para abrir o modal
const ContainerProducts = document.querySelector("#products"); // Contêiner onde os produtos serão exibidos
const containerAlert = document.querySelector("#container-alert"); // Contêiner para alertas
let produtos = JSON.parse(sessionStorage.getItem("produtos")) || []; // Carrega produtos do sessionStorage ou inicializa como array vazio

// Função para abrir o modal de adição de produtos
function ModalProduct() {
    modal.className = "active"; // Ativa o modal
    document.querySelector("body").style.overflowY = "hidden"; // Desabilita o scroll da página

    // Cria a estrutura do modal
    let addNewProduct = document.createElement("div");
    addNewProduct.className = "add-new-product";
    modal.appendChild(addNewProduct);

    // Cabeçalho do modal
    let NewProductHeader = document.createElement("div");
    NewProductHeader.className = "new-product-header";
    addNewProduct.appendChild(NewProductHeader);

    // Título do modal
    let title = document.createElement("h1");
    title.textContent = "Adicionar novo Produto";
    NewProductHeader.appendChild(title);

    // Botão de fechar o modal
    let btnClose = document.createElement("button");
    btnClose.setAttribute("id", "close");
    btnClose.innerHTML = "&times;"; // Ícone de fechar
    btnClose.addEventListener("click", CloseModal); // Adiciona evento de fechar
    NewProductHeader.appendChild(btnClose);

    // Corpo do modal
    let bodyNewProduct = document.createElement("div");
    bodyNewProduct.className = "body-new-product"; // Corrigir o nome da classe para "body-new-product"
    addNewProduct.appendChild(bodyNewProduct);

    // Criação do fieldset para os campos do produto
    let fieldset = document.createElement("fieldset");
    bodyNewProduct.appendChild(fieldset);

    // Contêiner para a imagem do produto
    let containerBox = document.createElement("div");
    containerBox.className = "container-box";
    let img = document.createElement("img");
    img.setAttribute("src", "assets/img/box-icon.png");
    img.setAttribute("alt", "Imagem representativa de produto");
    containerBox.appendChild(img);
    fieldset.appendChild(containerBox);

    // Contêiner para as informações do produto
    let productInfo = document.createElement("div");
    productInfo.className = "product-info";
    fieldset.appendChild(productInfo);

    // Campo para descrição do produto
    productInfo.appendChild(contentInput("text", "descricao-produto", "descricao-produto", "Produto"));

    // Linha para informações do produto
    let productInfoRowModal = document.createElement("div");
    productInfoRowModal.className = "product-info-row-modal";
    productInfo.appendChild(productInfoRowModal);

    // Campo para unidade de medida
    const select = document.createElement("select");
    select.setAttribute("name", "unidade-medida");
    select.setAttribute("id", "unidade-medida");
    select.required = true;
    productInfoRowModal.appendChild(select);

    // Opções para unidade de medida
    const opcoes = [
        { value: "", text: "UNID. Medida" },
        { value: "un", text: "Unidade" },
        { value: "kg", text: "Quilograma" },
        { value: "g", text: "Grama" },
        { value: "L", text: "Litro" },
        { value: "ml", text: "Mililitro" },
        { value: "m", text: "Metro" },
        { value: "cm", text: "Centímetro" },
        { value: "cx", text: "Caixa" },
        { value: "pct", text: "Pacote" },
        { value: "par", text: "Par" },
        { value: "dz", text: "Dúzia" }
    ];

    // Adiciona as opções ao select
    opcoes.forEach(opcao => {
        const option = document.createElement("option");
        option.value = opcao.value;
        option.textContent = opcao.text;
        select.appendChild(option);
    });

    // Campos para quantidade em estoque e valor unitário
    productInfoRowModal.appendChild(contentInput("number", "qtd-estoque", "qtd-estoque", "QTD. em Estoque"));
    productInfoRowModal.appendChild(contentInput("number", "valor-unitario", "valor-unitario", "Valor Unitário"));

    // Botão para adicionar o produto
    let addNewProductModal = document.createElement("button");
    addNewProductModal.className = "add-product";
    addNewProductModal.setAttribute("type", "button");
    addNewProductModal.setAttribute("id", "add-product-modal");
    addNewProductModal.textContent = "Adicionar Produto";
    bodyNewProduct.appendChild(addNewProductModal);

    // Adiciona evento para validar e adicionar o produto
    addNewProductModal.addEventListener("click", () => validar());
}

// Função para criar um campo de entrada com label
function contentInput(type, id, name, text) {
    let contentInput = document.createElement("div");
    contentInput.className = "content-input";

    let inputDescricao = document.createElement("input");
    inputDescricao.setAttribute("type", type);
    inputDescricao.setAttribute("id", id);
    inputDescricao.setAttribute("name", name);
    inputDescricao.required = true;

    contentInput.appendChild(inputDescricao);

    let labelDescricao = document.createElement("label");
    labelDescricao.setAttribute("for", id);
    labelDescricao.textContent = text;

    contentInput.appendChild(labelDescricao);

    return contentInput; // Retorna o campo de entrada completo
}

// Função para fechar o modal
function CloseModal() {
    document.querySelector("body").style.overflowY = "auto"; // Reabilita o scroll da página
    modal.className = "disabled"; // Desativa o modal
    modal.innerHTML = ""; // Limpa o conteúdo do modal
}

// Função para salvar produtos no sessionStorage
function salvarProdutosNoStorage() {
    sessionStorage.setItem("produtos", JSON.stringify(produtos)); // Salva os produtos como string JSON
}

// Função para atualizar a lista de produtos exibida
function atualizarProducts() {
    ContainerProducts.innerHTML = ""; // Limpa o contêiner de produtos

    // Verifica se não há produtos cadastrados
    if (produtos.length == 0) {
        let noProducts = document.createElement("div");
        noProducts.className = "no-products";

        let containerBox = document.createElement("div");
        containerBox.className = "container-box";

        let img = document.createElement("img");
        img.setAttribute("src", "assets/img/caixa-vazia.png");
        img.setAttribute("alt", "Imagem representativa de falta de produto");

        containerBox.appendChild(img);
        let h3 = document.createElement("h3");
        h3.textContent = "Nenhum Produto Cadastrado";

        noProducts.appendChild(containerBox);
        noProducts.appendChild(h3);
        ContainerProducts.appendChild(noProducts);
    } else {
        // Cria a exibição de cada produto
        produtos.forEach((produto, index) => {
            criarProduto(index + 1, produto.descricaoProduto, produto.unidadeMedida, produto.qtdEstoque, produto.valorUnitario, produto.valorTotal);
        });
    }
}

// Função para adicionar um novo produto
function AdicionarProduto() {
    if (produtos.length == 0) {
        ContainerProducts.innerHTML = ""; // Limpa o contêiner se for o primeiro produto
    }

    // Coleta os dados do produto
    const descricaoProduto = document.querySelector("#descricao-produto").value;
    const unidadeMedida = document.querySelector("#unidade-medida").value;
    const qtdEstoque = parseFloat(document.querySelector("#qtd-estoque").value);
    const valorUnitario = parseFloat(document.querySelector("#valor-unitario").value.replace(",", "."));
    const valorTotal = qtdEstoque * valorUnitario;

    // Cria um novo objeto de produto
    const novoProduto = {
        descricaoProduto,
        unidadeMedida,
        qtdEstoque,
        valorUnitario,
        valorTotal
    };

    produtos.push(novoProduto); // Adiciona o novo produto ao array
    salvarProdutosNoStorage(); // Salva os produtos no sessionStorage

    // Cria a exibição do novo produto
    criarProduto(produtos.length, descricaoProduto, unidadeMedida, qtdEstoque, valorUnitario, valorTotal);
}

// Função para criar a exibição de um produto
function criarProduto(index, descricaoProduto, unidadeMedida, qtdEstoque, valorUnitario, valorTotal) {
    let productRow = document.createElement("div");
    productRow.className = "product-row";
    ContainerProducts.appendChild(productRow);

    // Contêiner para o ícone de exclusão
    let productTrash = document.createElement("div");
    productTrash.className = "product-trash";
    productRow.appendChild(productTrash);

    // Ícone de exclusão
    let iconTrash = document.createElement("i");
    iconTrash.className = "bxr bx-trash";
    iconTrash.addEventListener("click", function () {
        produtos.splice(index - 1, 1); // Remove o produto do array
        salvarProdutosNoStorage(); // Atualiza o sessionStorage
        atualizarProducts(); // Atualiza a exibição dos produtos
    });
    productTrash.appendChild(iconTrash);

    // Criação do fieldset para as informações do produto
    let fieldset = document.createElement("fieldset");
    productRow.appendChild(fieldset);

    // Legenda com o índice do produto
    let legend = document.createElement("legend");
    legend.textContent = `Produto - ${index}`;
    fieldset.appendChild(legend);

    // Contêiner para a imagem do produto
    let containerBox = document.createElement("div");
    containerBox.className = "container-box";
    fieldset.appendChild(containerBox);

    let img = document.createElement("img");
    img.setAttribute("src", "assets/img/box-icon.png");
    img.setAttribute("alt", "Imagem representativa de produto");
    containerBox.appendChild(img);

    // Contêiner para as informações do produto
    let productInfo = document.createElement("div");
    productInfo.className = "product-info";
    fieldset.appendChild(productInfo);

    // Adiciona as informações do produto
    productInfo.appendChild(infoProduct("Produto", descricaoProduto));
    let productInfoRow = document.createElement("div");
    productInfoRow.className = "product-info-row";

    // Adiciona informações adicionais
    productInfoRow.appendChild(infoProduct("UND. Medida", unidadeMedida));
    productInfoRow.appendChild(infoProduct("QTD. em Estoque", qtdEstoque));
    productInfoRow.appendChild(infoProduct("Valor unitário", `R$ ${valorUnitario.toFixed(2).replace(".", ",")}`));
    productInfoRow.appendChild(infoProduct("Valor Total", `R$ ${valorTotal.toFixed(2).replace(".", ",")}`));

    productInfo.appendChild(productInfoRow);
}

// Função para criar a exibição de informações do produto
function infoProduct(titulo, valor) {
    let productText = document.createElement("fieldset");
    productText.className = "product-text";

    let legendText = document.createElement("legend");
    legendText.textContent = titulo;

    let pText = document.createElement("p");
    pText.textContent = valor;

    productText.appendChild(legendText);
    productText.appendChild(pText);

    return productText; // Retorna o campo de informação do produto
}

// Função para validar os dados do produto antes de adicionar
function validar() {
    const descricaoProduto = document.querySelector("#descricao-produto").value;
    const unidadeMedida = document.querySelector("#unidade-medida").value;
    let qtdEstoque = document.querySelector("#qtd-estoque").value.trim().replace(/\s+/g, ' ');
    let valorUnitario = document.querySelector("#valor-unitario").value.trim().replace(/\s+/g, ' ');

    // Converte valores para número
    if (qtdEstoque == "") {
        qtdEstoque = 0;
    } else {
        qtdEstoque = parseFloat(qtdEstoque);
    }

    if (valorUnitario == "") {
        valorUnitario = 0;
    } else {
        valorUnitario = parseFloat(valorUnitario.replace(",", "."));
    }

    // Valida os campos
    if (descricaoProduto.trim().replace(/\s+/g, ' ') == "") {
        errorAlert("Preencha a descrição do produto");
    } else if (unidadeMedida.trim().replace(/\s+/g, ' ') == "") {
        errorAlert("Preencha a unidade de medida do produto");
    } else if (qtdEstoque <= 0) {
        errorAlert("Preencha a quantidade em estoque do produto, sendo um valor maior de 0");
    } else if (valorUnitario <= 0) {
        errorAlert("Preencha o valor unitário do produto, sendo um valor maior de 0");
    } else {
        AdicionarProduto(); // Adiciona o produto se todas as validações passarem
        CloseModal(); // Fecha o modal
    }
}

// Adiciona evento para abrir o modal ao clicar no botão
addProduct.addEventListener("click", ModalProduct);
