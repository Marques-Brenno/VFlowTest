const modal = document.querySelector('#modal');
const addProduct = document.querySelector("#add-product");
const ContainerProducts = document.querySelector("#products");
const containerAlert = document.querySelector("#container-alert");
let produtos = []

window.onload = function () {
    // sessionStorage.clear();
  const dados = sessionStorage.getItem("produtos");
  produtos = dados ? JSON.parse(dados) : [];
  atualizarProducts();
};

function ModalProduct(){
    modal.className = "active";
    document.querySelector("body").style.overflowY = "hidden";

    let addNewProduct = document.createElement("div");
    addNewProduct.className = "add-new-product";

    modal.appendChild(addNewProduct);

    let NewProductHeader = document.createElement("div");
    NewProductHeader.className = "new-product-header";

    addNewProduct.appendChild(NewProductHeader);

    let title = document.createElement("h1");
    title.textContent = "Adicionar novo Produto";

    NewProductHeader.appendChild(title);

    let btnClose = document.createElement("button");
    btnClose.setAttribute("id", "close");
    btnClose.innerHTML = "&times;";
    btnClose.addEventListener("click", CloseModal);

    NewProductHeader.appendChild(btnClose);

    let bodyNewProduct = document.createElement("div");
    bodyNewProduct.className = "body-new-peoduct";

    addNewProduct.appendChild(bodyNewProduct);

    let fieldset = document.createElement("fieldset");

    bodyNewProduct.appendChild(fieldset);

    let containerBox = document.createElement("div");
    containerBox.className = "container-box";

    let img = document.createElement("img");
    img.setAttribute("src", "assets/img/box-icon.png");
    img.setAttribute("alt", "Imagem representativa de produto");

    containerBox.appendChild(img);
    fieldset.appendChild(containerBox);

    let productInfo = document.createElement("div");
    productInfo.className = "product-info";

    fieldset.appendChild(productInfo);

    productInfo.appendChild(contentInput("text", "descricao-produto", "descricao-produto", "Produto"));

    let productInfoRowModal = document.createElement("div");
    productInfoRowModal.className = "product-info-row-modal";

    productInfo.appendChild(productInfoRowModal);

    const select = document.createElement("select");
    select.setAttribute("name", "unidade-medida");
    select.setAttribute("id", "unidade-medida");
    select.required = true;

    productInfoRowModal.appendChild(select);

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

    opcoes.forEach(opcao => {
        const option = document.createElement("option");
        option.value = opcao.value;
        option.textContent = opcao.text;
        select.appendChild(option);
    });

    productInfoRowModal.appendChild(contentInput("number", "qtd-estoque", "qtd-estoque", "QTD. em Estoque"));
    productInfoRowModal.appendChild(contentInput("number", "valor-unitario", "valor-unitario", "Valor Unitário"));

    let addNewProductModal = document.createElement("button");
    addNewProductModal.className = "add-product";
    addNewProductModal.setAttribute("id", "add-product-modal");
    addNewProductModal.textContent = "Adicionar Produto";

    bodyNewProduct.appendChild(addNewProductModal);

    addNewProductModal.addEventListener("click", validar);

}

function contentInput(type, id, name, text){
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

    return contentInput;
}

function CloseModal(){
    document.querySelector("body").style.overflowY = "auto";
    modal.className = "disabled";
    modal.innerHTML = "";

}

function salvarProdutosNoStorage() {
  sessionStorage.setItem("produtos", JSON.stringify(produtos));
} 

function atualizarProducts(){

    ContainerProducts.innerHTML = "";

    if(produtos.length == 0){
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
    }
    else{
       produtos.forEach((produto, index) => {
            criarProduto(index + 1,produto.descricaoProduto,produto.unidadeMedida,produto.qtdEstoque,produto.valorUnitario,produto.valorTotal)
        });
    }
}

function AdicionarProduto(){

    if(produtos.length == 0){
        ContainerProducts.innerHTML = "";
    }

    const descricaoProduto = document.querySelector("#descricao-produto").value;
    const unidadeMedida = document.querySelector("#unidade-medida").value;
    const qtdEstoque = parseFloat(document.querySelector("#qtd-estoque").value);
    const valorUnitario = parseFloat(document.querySelector("#valor-unitario").value.replace(",", "."));
    const valorTotal = qtdEstoque * valorUnitario;

    const novoProduto = {
        descricaoProduto,
        unidadeMedida,
        qtdEstoque,
        valorUnitario,
        valorTotal
    };

    produtos.push(novoProduto);
    salvarProdutosNoStorage();

    criarProduto(produtos.length,descricaoProduto,unidadeMedida,qtdEstoque,valorUnitario,valorTotal)
}

function criarProduto(index,descricaoProduto,unidadeMedida,qtdEstoque,valorUnitario,valorTotal){
    let productRow = document.createElement("div");
    productRow.className = "product-row";

    ContainerProducts.appendChild(productRow);

    let productTrash = document.createElement("div");
    productTrash.className = "product-trash";

    productRow.appendChild(productTrash);

    let iconTrash = document.createElement("i");
    iconTrash.className = "bxr bx-trash";

    iconTrash.addEventListener("click", function(){
        produtos.splice(index - 1, 1);

        salvarProdutosNoStorage();

        atualizarProducts();
    });

    productTrash.appendChild(iconTrash);

    let fieldset = document.createElement("fieldset");

    productRow.appendChild(fieldset)

    let legend = document.createElement("legend");
    legend.textContent = `Produto - ${index}`

    fieldset.appendChild(legend);

    let containerBox = document.createElement("div");
    containerBox.className = "container-box";

    fieldset.appendChild(containerBox);

    let img = document.createElement("img");
    img.setAttribute("src","assets/img/box-icon.png");
    img.setAttribute("alt", "Imagem representativa de produto");


    containerBox.appendChild(img);

    let productInfo = document.createElement("div");
    productInfo.className = "product-info";

    fieldset.appendChild(productInfo);

    productInfo.appendChild(infoProduct("Produto", descricaoProduto));

    let productInfoRow = document.createElement("div");
    productInfoRow.className = "product-info-row";

    productInfoRow.appendChild(infoProduct("UND. Medida",unidadeMedida));
    productInfoRow.appendChild(infoProduct("QTD. em Estoque",qtdEstoque));
    productInfoRow.appendChild(infoProduct("Valor unitário",`R$ ${valorUnitario.toFixed(2).replace(".", ",")}`));
    productInfoRow.appendChild(infoProduct("Valor Total",`R$ ${valorTotal.toFixed(2).replace(".", ",")}`));
    
    productInfo.appendChild(productInfoRow);
}

function infoProduct(titulo,valor){
    let productText = document.createElement("fieldset");
    productText.className = "product-text";

    let legendText = document.createElement("legend");
    legendText.textContent = titulo;

    let pText = document.createElement("p");
    pText.textContent = valor;

    productText.appendChild(legendText);
    productText.appendChild(pText);

    return productText;
}




function validar(){
    const descricaoProduto = document.querySelector("#descricao-produto").value;
    const unidadeMedida = document.querySelector("#unidade-medida").value;
    let qtdEstoque = document.querySelector("#qtd-estoque").value.trim().replace(/\s+/g, ' ');
    let valorUnitario = document.querySelector("#valor-unitario").value.trim().replace(/\s+/g, ' ');
    
    if(qtdEstoque == ""){
        qtdEstoque = 0;
    }
    else{
        qtdEstoque = parseFloat(qtdEstoque);
    }

    if(valorUnitario == ""){
        valorUnitario = 0;
    }
    else{
        valorUnitario = parseFloat(valorUnitario.replace(",", "."));
    }

    if(descricaoProduto.trim().replace(/\s+/g, ' ') == ""){
        errorAlert("Preencha a descrição do produto");
    }
    else if(unidadeMedida.trim().replace(/\s+/g, ' ') == ""){
        errorAlert("Preencha a unidade de medida do produto");
    }
    else if(qtdEstoque <= 0){
        errorAlert("Preencha a quantidade em estoque do produto, sendo um valor maior de 0");
    }
    else if(valorUnitario <= 0){
        errorAlert("Preencha o valor unitário do produto, sendo um valor maior de 0");
    }
    else{
        AdicionarProduto();
        CloseModal();
    }
}

addProduct.addEventListener("click", ModalProduct);