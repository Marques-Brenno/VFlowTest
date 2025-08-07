const { createElement } = require("react");

const modal = document.querySelector('#modal');
const closeModal = document.querySelector("#close");
const addProduct = document.querySelector("#add-product");
const addProductModal = document.querySelector("#add-product-modal");
const ContainerProducts = document.querySelector("#products");
const containerAlert = document.querySelector("#container-alert");
let produtos = []

window.onload = function () {
  const dados = sessionStorage.getItem("produtos");
  produtos = dados ? JSON.parse(dados) : [];
  atualizarProducts();
};

function ModalProduct(){
    modal.className = "active";
}

function CloseModal(){
    modal.className = "disabled";
    document.querySelector("#descricao-produto").value = "";
    document.querySelector("#unidade-medida").value = "";
    document.querySelector("#qtd-estoque").value = "";
    document.querySelector("#valor-unitario").value = "";
}

function ProductAlert(textAlert){
    let divAlert = document.createElement("div");
    divAlert.className = "alert";
    divAlert.style.marginLeft = "100%";
    
    let div = document.createElement("div");

    let alertIcon = document.createElement("div");
    alertIcon.className = "alert-icon";

    let alertCircle = document.createElement("div");
    alertCircle.className = "alert-circle";

    let icon = document.createElement("i");
    icon.className = "fa-solid fa-exclamation"; 

    let alertText = document.createElement("div");
    alertText.className = "alert-text";
    alertText.textContent = textAlert;

    let alertTime = document.createElement("div");
    alertTime.className = "alert-time"; 

    
    containerAlert.appendChild(divAlert);
    divAlert.appendChild(div);
    div.appendChild(alertIcon);
    alertIcon.appendChild(alertCircle);
    alertCircle.appendChild(icon);
    div.appendChild(alertText);
    divAlert.appendChild(alertTime);
    
    setTimeout(function(){
        divAlert.style.animation = "forwards .5s diminui"; 
    },4500);

    
    setTimeout(function(){
        divAlert.remove();
    },5000);
}

function salvarProdutosNoStorage() {
  sessionStorage.setItem("produtos", JSON.stringify(produtos));
} 

function AdicionarProduto(){
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

    let productRow = document.createElement("div");
    productRow.className = "product-row";

    ContainerProducts.appendChild(productRow);

    let productTrash = document.createElement("div");
    productTrash.className = "product-trash";

    productRow.appendChild(productTrash);

    let iconTrash = document.createElement("i");
    iconTrash.className = "bxr bx-trash";

    productTrash.appendChild(iconTrash);

    let fieldset = document.createElement("fieldset");

    productRow.appendChild(fieldset)

    let legend = document.createElement("legend");
    legend.textContent = `Produto - ${produtos.length}`

    fieldset.appendChild(legend);

    let containerBox = document.createElement("div");
    containerBox.className = "container-box";

    fieldset.appendChild(containerBox);

    let img = document.createElement("img");
    img.setAttribute("src","assets/img/box-icon.png");

    containerBox.appendChild(img);

    let productInfo = document.createElement("div");
    productInfo.className = "product-info";

    productInfo.appendChild(fieldset("Produto", descricaoProduto));

    let productInfoRow = createElement("div");
    productInfoRow.className = "product-info-row";

    productInfoRow.appendChild(fieldset("UND. Medida",unidadeMedida));
    productInfoRow.appendChild(fieldset("QTD. em Estoque",qtdEstoque));
    productInfoRow.appendChild(fieldset("Valor unitário",valorUnitario.toFixed(2).replace(".", ",")))
    productInfoRow.appendChild(fieldset("Valor Total",valorTotal.toFixed(2).replace(".", ",")))


}

function fieldset(titulo,valor){
    const fieldset = document.createElement("fieldset");
    fieldset.className = "product-text";

    const legend = document.createElement("legend");
    legend.textContent = titulo;

    const p = document.createElement("p");
    p.textContent = valor;

    fieldset.appendChild(legend);
    fieldset.appendChild(p);

    return fieldset;
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
        ProductAlert("Preencha a descrição do produto");
    }
    else if(unidadeMedida.trim().replace(/\s+/g, ' ') == ""){
        ProductAlert("Preencha a unidade de medida do produto");
    }
    else if(qtdEstoque <= 0){
        ProductAlert("Preencha a quantidade em estoque do produto, sendo um valor maior de 0");
    }
    else if(valorUnitario <= 0){
        ProductAlert("Preencha o valor unitário do produto, sendo um valor maior de 0");
    }
    else{
        // alert("ola")
        CloseModal();
        AdicionarProduto();
    }
}

addProduct.addEventListener("click", ModalProduct);
closeModal.addEventListener("click", CloseModal);
addProductModal.addEventListener("click", validar);