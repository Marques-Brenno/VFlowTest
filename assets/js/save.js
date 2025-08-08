// Seleciona o botão de salvar fornecedor e o modal de carregamento
const saveSupplier = document.querySelector("#save-supplier");
const loadingModal = document.querySelector("#modal");

// Função para gerar o JSON com os dados do fornecedor, produtos e anexos
function gerarJson() {
    const produtos = JSON.parse(sessionStorage.getItem("produtos") || "[]");
    const anexosRaw = JSON.parse(sessionStorage.getItem("anexos") || "[]");

    // Mapeia os anexos para o formato desejado
    const anexos = anexosRaw.map((anexo, index) => ({
        indice: index + 1,
        nomeArquivo: anexo.name,
        blobArquivo: anexo.url
    }));

    // Cria o objeto JSON final com os dados do formulário
    const jsonFinal = {
        razaoSocial: document.querySelector("#razao-social").value,
        nomeFantasia: document.querySelector("#nome-fantasia").value,
        cnpj: document.querySelector("#cnpj").value,
        inscricaoEstadual: document.querySelector("#inscricao-estadual").value,
        inscricaoMunicipal: document.querySelector("#inscricao-municipal").value,
        nomeContato: document.querySelector("#pessoa-contato").value,
        telefoneContato: document.querySelector("#telefone").value,
        emailContato: document.querySelector("#email").value,
        endereco: document.querySelector("#endereco").value,
        numero: document.querySelector("#numero").value,
        complemento: document.querySelector("#complemento").value,
        bairro: document.querySelector("#bairro").value,
        municipio: document.querySelector("#municipio").value,
        estado: document.querySelector("#estado").value,
        produtos: produtos.map((produto, index) => ({
            indice: index + 1,
            descricaoProduto: produto.descricaoProduto,
            unidadeMedida: produto.unidadeMedida,
            qtdeEstoque: produto.qtdEstoque,
            valorUnitario: produto.valorUnitario,
            valorTotal: produto.valorTotal
        })),
        anexos: anexos
    };

    console.log("✅ JSON completo:");
    console.log(JSON.stringify(jsonFinal, null, 2));
}

// Função para carregar o modal de carregamento
function loadModal() {
    loadingModal.className = "active"; // Ativa o modal
    document.querySelector("body").style.overflowY = "hidden"; // Desabilita o scroll da página

    let loadBox = document.createElement("div");
    loadBox.className = "loading-box";
    loadingModal.appendChild(loadBox);

    let spin = document.createElement("div");
    spin.className = "spinner";
    loadBox.appendChild(spin);

    let text = document.createElement("p");
    text.textContent = "Gerando JSON, aguarde...";
    loadBox.appendChild(text);
}

// Função para fechar o modal de carregamento
function CloseModal() {
    document.querySelector("body").style.overflowY = "auto"; // Habilita o scroll da página
    loadingModal.className = "disabled"; // Desativa o modal
    loadingModal.innerHTML = ""; // Limpa o conteúdo do modal
}

// Adiciona um evento de clique ao botão de salvar fornecedor
saveSupplier.addEventListener("click", function () {
    const produtos = JSON.parse(sessionStorage.getItem("produtos") || "[]");
    const anexosBase = JSON.parse(sessionStorage.getItem("anexos") || "[]");

    if (dadosFornecedor() && produtos.length !== 0 && anexosBase.length !== 0) {
        loadModal(); // Carrega o modal de carregamento

        setTimeout(() => {
            gerarJson(); // Gera o JSON
            CloseModal(); // Fecha o modal
        }, 1000);
    } else if (produtos.length === 0) {
        errorAlert("Precisa ter ao menos 1 produto"); // Alerta se não houver produtos
    } else if (anexosBase.length === 0) {
        errorAlert("Precisa ter ao menos 1 anexo"); // Alerta se não houver anexos
    }
});
