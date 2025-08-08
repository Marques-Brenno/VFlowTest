// Seleciona o botão para exibir o modal de anexos e o contêiner onde os anexos serão exibidos
const exibirModalAnexo = document.querySelector("#add-anexo");
const containerAnexo = document.querySelector("#anexos");

// Recupera os anexos do sessionStorage ou inicializa como um array vazio
let anexos = JSON.parse(sessionStorage.getItem("anexos")) || [];

// Função para abrir o modal de anexos
function ModalAnexo() {
    modal.className = "active"; // Ativa o modal
    document.querySelector("body").style.overflowY = "hidden"; // Desabilita o scroll da página

    let addAnexo = document.createElement("div");
    addAnexo.className = "add-anexo";
    modal.appendChild(addAnexo);

    let addAnexoHeader = document.createElement("div");
    addAnexoHeader.className = "anexo-header";
    addAnexo.appendChild(addAnexoHeader);

    // Título do modal
    let title = document.createElement("h1");
    title.textContent = "Adicionar novo Anexo";
    addAnexoHeader.appendChild(title);

    // Botão de fechar o modal
    let btnClose = document.createElement("button");
    btnClose.setAttribute("id", "close");
    btnClose.innerHTML = "&times;";
    btnClose.addEventListener("click", CloseModal);
    addAnexoHeader.appendChild(btnClose);

    // Corpo do modal
    let bodyAnexo = document.createElement("div");
    bodyAnexo.className = "body-anexo";
    addAnexo.appendChild(bodyAnexo);

    // Criação do fieldset para o conteúdo do modal
    let fieldset = document.createElement("fieldset");
    bodyAnexo.appendChild(fieldset);

    // Contêiner para o upload do arquivo
    let container = document.createElement("div");
    container.className = "container";
    fieldset.appendChild(container);

    // Estrutura para o upload do arquivo
    let folder = document.createElement("div");
    folder.className = "folder";
    container.appendChild(folder);

    let frontSide = document.createElement("div");
    frontSide.className = "front-side";
    folder.appendChild(frontSide);

    let tip = document.createElement("div");
    tip.className = "tip";
    frontSide.appendChild(tip);

    let cover = document.createElement("div");
    cover.className = "cover";
    frontSide.appendChild(cover);

    let backSideCover = document.createElement("div");
    backSideCover.className = "back-side cover";
    folder.appendChild(backSideCover);

    // Label para o input de arquivo
    let customFile = document.createElement("label");
    customFile.className = "custom-file-upload";
    container.appendChild(customFile);

    // Input para seleção de arquivo
    let inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.className = "title";
    customFile.textContent += "Escolha um arquivo";
    customFile.appendChild(inputFile);

    // Título do anexo selecionado
    let anexoTitle = document.createElement("h2");
    anexoTitle.className = "anexo-title";
    fieldset.appendChild(anexoTitle);

    // Atualiza o título do anexo quando um arquivo é selecionado
    inputFile.addEventListener("change", () => {
        anexoTitle.textContent = inputFile.files.length > 0 ? inputFile.files[0].name : "";
    });

    // Botão para adicionar o anexo
    let addFile = document.createElement("button");
    addFile.setAttribute("type", 'button');
    addFile.setAttribute("id", 'add-anexo-modal');
    addFile.textContent = "Adicionar Anexo";
    bodyAnexo.appendChild(addFile);

    // Valida o arquivo e adiciona o anexo
    addFile.addEventListener("click", () => validarFile(inputFile));
}

// Função para fechar o modal
function CloseModal() {
    document.querySelector("body").style.overflowY = "auto"; // Habilita o scroll da página
    modal.className = "disabled"; // Desativa o modal
    modal.innerHTML = ""; // Limpa o conteúdo do modal
}

// Função para validar se um arquivo foi selecionado
function validarFile(inputFileModal) {
    if (inputFileModal.files.length == 0) {
        errorAlert("Você precisa selecionar um arquivo"); // Alerta se nenhum arquivo foi selecionado
    } else {
        addAnexoBlob(inputFileModal.files[0]); // Adiciona o anexo se um arquivo foi selecionado
    }
}

// Função para atualizar a lista de anexos exibidos
function atualizarAnexos() {
    containerAnexo.innerHTML = ""; // Limpa o contêiner de anexos

    // Cria um título para a lista de itens
    let itens = document.createElement("legend");
    itens.textContent = "Itens";
    containerAnexo.appendChild(itens);

    // Verifica se não há anexos
    if (anexos.length === 0) {
        let noAnexos = document.createElement("div");
        noAnexos.className = "no-anexos";
        noAnexos.textContent = "Nenhum Anexo Adicionado";
        containerAnexo.appendChild(noAnexos);
        return;
    }

    // Exibe cada anexo na lista
    anexos.forEach((anexo, index) => {
        let anexoRow = document.createElement("div");
        anexoRow.className = "anexo-row";
        containerAnexo.appendChild(anexoRow);

        // Botão para remover o anexo
        let anexoTrash = document.createElement("div");
        anexoTrash.className = "anexo-trash";
        anexoRow.appendChild(anexoTrash);

        let iconTrash = document.createElement("i");
        iconTrash.className = "bxr bx-trash";
        iconTrash.addEventListener("click", () => {
            anexos.splice(index, 1); // Remove o anexo da lista
            sessionStorage.setItem("anexos", JSON.stringify(anexos)); // Atualiza o sessionStorage
            atualizarAnexos(); // Atualiza a lista de anexos exibidos
        });
        anexoTrash.appendChild(iconTrash);

        // Link para download do anexo
        let anexoEye = document.createElement("a");
        anexoEye.className = "anexo-eye";
        anexoEye.setAttribute("href", anexo.url);
        anexoEye.setAttribute("download", anexo.name);
        anexoRow.appendChild(anexoEye);

        let iconEye = document.createElement("i");
        iconEye.className = "bxr bx-eye-alt";
        anexoEye.appendChild(iconEye);

        // Título do anexo
        let anexoTitle = document.createElement("p");
        anexoTitle.textContent = anexo.name;
        anexoRow.appendChild(anexoTitle);
    });
}

// Função para adicionar um anexo como Blob
async function addAnexoBlob(anexo) {
    const url = URL.createObjectURL(anexo); // Cria um URL temporário para o Blob
    
    anexos.push({
        name: anexo.name,
        url: url
    });

    sessionStorage.setItem("anexos", JSON.stringify(anexos)); // Atualiza o sessionStorage
    atualizarAnexos(); // Atualiza a lista de anexos exibidos
    CloseModal(); // Fecha o modal
}

// Adiciona um evento de clique para abrir o modal de anexos
exibirModalAnexo.addEventListener("click", ModalAnexo);
